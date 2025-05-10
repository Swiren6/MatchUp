import React from 'react';

const AdminDashboard=()=>{
    const stats = [
    { id: 1, title: " Les Offres publies ", value: 10, change: "+3 cette semaine", icon: "📢" },
    { id: 2, title: "Les utilisateurs ", value: 15, change: "+2 aujourd'hui", icon: "📄" },
    { id: 3, title: "Taux de conversion", value: "38%", change: "+6%", icon: "📈" }
  ];
    
    
        return(
            <div className="admin-dashboard">
                <div className="section-header">
                    <h2>Tableau de bord</h2>
                    <p>Bienvenue dans votre espace de gestion</p>
                </div>
    
                {/* Statistiques */}
                <div className="stats-grid">
                    {stats.map(stat => (
                        <div key={stat.id} className="stat-card">
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-content">
                                <h3>{stat.title}</h3>
                                <p className="stat-value">{stat.value}</p>
                                <p className="stat-change">{stat.change}</p>
                            </div>
                        </div>
                    ))}
                </div>
    
            </div>
        )

}
export default AdminDashboard;