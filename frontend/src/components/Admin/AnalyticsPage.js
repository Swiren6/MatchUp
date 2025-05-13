import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart } from 'chart.js/auto';
import './AnalyticsPage.css';

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(false);
  
  // Références pour les canvas des graphiques
  const usersChartRef = useRef(null);
  const offersChartRef = useRef(null);
  const revenueChartRef = useRef(null);
  
  // Données simulées
  const data = {
    week: {
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      users: [120, 190, 150, 220, 200, 240, 300],
      offers: [15, 20, 25, 30, 27, 35, 40],
      revenue: [500, 800, 600, 900, 1000, 1200, 1500]
    },
    month: {
      labels: Array.from({length: 12}, (_, i) => `Sem ${i+1}`),
      users: [300, 400, 350, 500, 600, 700, 800, 900, 850, 950, 1000, 1100],
      offers: [40, 50, 45, 60, 70, 65, 75, 80, 85, 90, 95, 100],
      revenue: [1500, 1800, 2000, 2200, 2500, 2400, 2600, 2800, 3000, 3200, 3500, 4000]
    },
    year: {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
      users: [1000, 1200, 1500, 1800, 2000, 2200, 2500, 2800, 3000, 3200, 3500, 4000],
      offers: [100, 120, 150, 180, 200, 220, 250, 280, 300, 320, 350, 400],
      revenue: [4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 10000]
    }
  };

  useEffect(() => {
    // Détruire les anciens graphiques avant d'en créer de nouveaux
    let usersChart, offersChart, revenueChart;

    if (usersChartRef.current && offersChartRef.current && revenueChartRef.current) {
      // Créer le graphique des utilisateurs
      usersChart = new Chart(usersChartRef.current, {
        type: 'line',
        data: {
          labels: data[timeRange].labels,
          datasets: [{
            label: 'Utilisateurs',
            data: data[timeRange].users,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      });

      // Créer le graphique des offres
      offersChart = new Chart(offersChartRef.current, {
        type: 'bar',
        data: {
          labels: data[timeRange].labels,
          datasets: [{
            label: 'Offres',
            data: data[timeRange].offers,
            backgroundColor: '#10b981',
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      });

      // Créer le graphique du revenue
      revenueChart = new Chart(revenueChartRef.current, {
        type: 'line',
        data: {
          labels: data[timeRange].labels,
          datasets: [{
            label: 'Revenue ($)',
            data: data[timeRange].revenue,
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        }
      });
    }

    // Nettoyage
    return () => {
      if (usersChart) usersChart.destroy();
      if (offersChart) offersChart.destroy();
      if (revenueChart) revenueChart.destroy();
    };
  }, [timeRange]);

  const kpiCards = [
    { title: "Utilisateurs actifs", value: data[timeRange].users.slice(-1)[0], change: "+12%", icon: "👥" },
    { title: "Nouvelles offres", value: data[timeRange].offers.slice(-1)[0], change: "+8%", icon: "📢" },
    { title: "Revenue", value: `$${data[timeRange].revenue.slice(-1)[0]}`, change: "+15%", icon: "💰" },
    { title: "Taux de conversion", value: "3.2%", change: "+0.5%", icon: "📈" }
  ];

  return (
    <div className="analytics-page">
      <header className="analytics-header">
        <button onClick={() => navigate(-1)} className="back-button">
          &larr; Retour
        </button>
        <h1>Tableau d'Analytique</h1>
        <div className="time-range-selector">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-select"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="year">Cette année</option>
          </select>
        </div>
      </header>

      <main className="analytics-content">
        {/* Cartes KPI */}
        <section className="kpi-section">
          <div className="kpi-grid">
            {kpiCards.map((kpi, index) => (
              <div key={index} className="kpi-card">
                <div className="kpi-icon">{kpi.icon}</div>
                <div className="kpi-content">
                  <h3>{kpi.title}</h3>
                  <p className="kpi-value">{kpi.value}</p>
                  <p className={`kpi-change ${kpi.change.includes('+') ? 'positive' : 'negative'}`}>
                    {kpi.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Graphiques */}
        <section className="charts-section">
          <div className="chart-card">
            <h2>Nouveaux Utilisateurs</h2>
            <canvas ref={usersChartRef}></canvas>
          </div>
          
          <div className="chart-card">
            <h2>Offres Publiées</h2>
            <canvas ref={offersChartRef}></canvas>
          </div>
          
          <div className="chart-card">
            <h2>Revenue</h2>
            <canvas ref={revenueChartRef}></canvas>
          </div>
        </section>

        {/* Détails */}
        <section className="details-section">
          <div className="details-card">
            <h2>Statistiques détaillées</h2>
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Période</th>
                  <th>Utilisateurs</th>
                  <th>Offres</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {data[timeRange].labels.map((label, index) => (
                  <tr key={index}>
                    <td>{label}</td>
                    <td>{data[timeRange].users[index]}</td>
                    <td>{data[timeRange].offers[index]}</td>
                    <td>${data[timeRange].revenue[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AnalyticsPage;