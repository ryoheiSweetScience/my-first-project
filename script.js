// ===== Chart.js CDN 動的読み込み =====
function loadChartJS() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// ===== 売上・利益チャート =====
function createRevenueChart() {
  const ctx = document.getElementById('revenueChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [
        {
          label: '売上高（億元）',
          data: [30.3, 40.3, 79.7, 132.9, 249.0, 344.8],
          backgroundColor: 'rgba(10, 61, 98, 0.75)',
          borderColor: '#0a3d62',
          borderWidth: 1,
          borderRadius: 4,
          order: 2
        },
        {
          label: '営業利益（億元）',
          data: [-24.1, -25.9, -5.4, 11.6, 30.3, 34.3],
          type: 'line',
          borderColor: '#d4a843',
          backgroundColor: 'rgba(212, 168, 67, 0.1)',
          borderWidth: 3,
          pointRadius: 5,
          pointBackgroundColor: '#d4a843',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          fill: true,
          tension: 0.3,
          order: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: { size: 12 },
            usePointStyle: true,
            padding: 16
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const val = context.parsed.y;
              return context.dataset.label + ': ' + val.toFixed(1) + '億元';
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false }
        },
        y: {
          title: {
            display: true,
            text: '億元（RMB）',
            font: { size: 11 }
          },
          grid: { color: 'rgba(0,0,0,0.06)' }
        }
      }
    }
  });
}

// ===== 店舗数チャート =====
function createStoreChart() {
  const ctx = document.getElementById('storeChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [
        {
          label: '直営店',
          data: [4507, 3929, 5671, 5652, 10628, 13103],
          backgroundColor: 'rgba(10, 61, 98, 0.75)',
          borderColor: '#0a3d62',
          borderWidth: 1,
          borderRadius: 4
        },
        {
          label: 'パートナー店',
          data: [0, 0, 353, 2562, 5590, 8169],
          backgroundColor: 'rgba(212, 168, 67, 0.75)',
          borderColor: '#d4a843',
          borderWidth: 1,
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: { size: 12 },
            usePointStyle: true,
            padding: 16
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const val = context.parsed.y;
              return context.dataset.label + ': ' + val.toLocaleString() + '店';
            }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false }
        },
        y: {
          stacked: true,
          title: {
            display: true,
            text: '店舗数',
            font: { size: 11 }
          },
          grid: { color: 'rgba(0,0,0,0.06)' }
        }
      }
    }
  });
}

// ===== 店舗数比較バーチャート（CSS描画） =====
function createMarketShareChart() {
  const container = document.getElementById('marketShareChart');
  const data = [
    { name: '瑞幸咖啡', value: 21272, color: '#0a3d62' },
    { name: 'スターバックス', value: 7300, color: '#00704A' },
    { name: '庫迪咖啡', value: 6500, color: '#e65100' },
    { name: 'Manner', value: 1200, color: '#6a1b9a' }
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  data.forEach(item => {
    const barItem = document.createElement('div');
    barItem.className = 'bar-item';

    const barValue = document.createElement('div');
    barValue.className = 'bar-value';
    barValue.textContent = item.value.toLocaleString();

    const barWrapper = document.createElement('div');
    barWrapper.className = 'bar-wrapper';

    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.backgroundColor = item.color;
    bar.style.height = '0px';

    const targetHeight = (item.value / maxValue) * 200;
    setTimeout(() => {
      bar.style.height = targetHeight + 'px';
    }, 300);

    barWrapper.appendChild(bar);

    const barLabel = document.createElement('div');
    barLabel.className = 'bar-label';
    barLabel.textContent = item.name;

    barItem.appendChild(barValue);
    barItem.appendChild(barWrapper);
    barItem.appendChild(barLabel);
    container.appendChild(barItem);
  });
}

// ===== スコアバーアニメーション =====
function animateScoreBars() {
  const fills = document.querySelectorAll('.score-fill');
  fills.forEach(fill => {
    const targetWidth = fill.style.width;
    fill.style.width = '0%';
    setTimeout(() => {
      fill.style.width = targetWidth;
    }, 500);
  });
}

// ===== Intersection Observer でスクロールアニメーション =====
function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
  });
}

// ===== 初期化 =====
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadChartJS();
    createRevenueChart();
    createStoreChart();
  } catch (e) {
    console.warn('Chart.js の読み込みに失敗しました。グラフは表示されません。', e);
    document.querySelectorAll('.chart-area').forEach(area => {
      area.innerHTML = '<p style="text-align:center;color:#888;padding:2rem;">グラフの読み込みに失敗しました</p>';
    });
  }

  createMarketShareChart();
  animateScoreBars();
  setupScrollAnimations();
});
