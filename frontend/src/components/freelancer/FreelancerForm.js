import { useRouter } from 'next/router';
import { useState } from 'react';

export default function FreelancerForm() {
  const router = useRouter();
  const { projectId, projectTitle, projectBudget, projectDuration } = router.query;
  
  const [formData, setFormData] = useState({
    message: "",
    rate: "",
    timeline: "",
    portfolio: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission ici
    console.log({
      projectId,
      ...formData
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Postuler à {projectTitle}</h1>
      <p className="mb-6">
        Budget: {projectBudget} • Durée: {projectDuration}
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Message de motivation</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full p-2 border rounded"
            rows="4"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Tarif proposé</label>
            <input
              type="number"
              value={formData.rate}
              onChange={(e) => setFormData({...formData, rate: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Délai estimé</label>
            <input
              type="text"
              value={formData.timeline}
              onChange={(e) => setFormData({...formData, timeline: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Portfolio (optionnel)</label>
          <input
            type="file"
            onChange={(e) => setFormData({...formData, portfolio: e.target.files[0]})}
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Envoyer la candidature
        </button>
      </form>
    </div>
  );
}