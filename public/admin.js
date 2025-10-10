
    let adminToken = "";

    document.getElementById('loginBtn').addEventListener('click', async () => {
      const token = document.getElementById('tokenInput').value.trim();
      if (!token) {
        document.getElementById('loginError').textContent = "⚠️ Please enter token!";
        return;
      }
      

      
      const headers = { 'authorization': token };
      const res = await fetch('/api/admin/stats', {
        method:'GET',
        headers:{
          'authorization':token
        }
        
        })

      if (!res.ok) {
        document.getElementById('loginError').textContent = "❌ Invalid token!";
        return;
      }

      adminToken = token;
      document.getElementById('loginModal').style.display = 'none';
      document.getElementById('dashboard').style.display = 'block';
      loadDashboard();
    });

    async function loadDashboard() {
      const headers = { 'Authorization': adminToken };

      
      const s = await fetch('/api/admin/stats', { headers });
      const stats = await s.json();
      document.getElementById('summary').textContent =
        `Total: ${stats.total} — Avg rating: ${stats.avgRating}`;
        

      const dist = stats.distribution.reduce((acc, cur) => { acc[cur._id] = cur.count; return acc; }, {});
      const labels = [1,2,3,4,5];
      const data = labels.map(l => dist[l] || 0);
      const ctx = document.getElementById('distChart').getContext('2d');
      if (window.myChart) window.myChart.destroy();
      window.myChart = new Chart(ctx, {
        type: 'bar',
        data: { labels, datasets: [{ label: 'Count', data, backgroundColor:'#2193b0' }] },
        options: { responsive: true, maintainAspectRatio:false }
      });

      
      const f = await fetch('/api/admin/feedbacks?limit=50', { headers });
      const p = await f.json();
      const tbody = document.querySelector('#feedbackTable tbody');
      tbody.innerHTML = '';
      p.feedbacks.forEach(item => {
        const tr = document.createElement('tr');
        const date = new Date(item.createdAt).toLocaleString();
        tr.innerHTML = `
          <td>${date}</td>
          <td>${item.name || '-'}</td>
          <td>${item.email || '-'}</td>
          <td>${item.rating}</td>
          <td>${item.message}</td>
        `;
        tbody.appendChild(tr);
      });
    }
 