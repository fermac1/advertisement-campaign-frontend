import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../style.css';
import config from '../config';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../contexts/AppProvider';

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useContext(AppContext);
    
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: data.name || '',
    from: data.from || '',
    to: data.to || '',
    total_budget: data.total_budget || '',
    daily_budget: data.daily_budget || '',
    creatives: data.creatives || [],
  });

  const [errors, setErrors] = useState({
    name: '',
    from: '',
    to: '',
    total_budget: '',
    daily_budget: '',
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.from) newErrors.from = 'Start Date is required';
    if (!formData.to) newErrors.to = 'End Date is required';
    if (!formData.total_budget) newErrors.total_budget = 'Total budget is required';
    if (!formData.daily_budget) newErrors.daily_budget = 'Daily budget is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      creatives: e.target.files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true)

      const formDataToSend = new FormData();


      formDataToSend.append('name', formData.name);
      formDataToSend.append('from', formData.from);
      formDataToSend.append('to', formData.to);
      formDataToSend.append('total_budget', formData.total_budget);
      formDataToSend.append('daily_budget', formData.daily_budget);

      if (formData.creatives) {
        for (let i = 0; i < formData.creatives.length; i++) {
          formDataToSend.append('creatives[]', formData.creatives[i]);
        }
      }

      try {
        const response = await axios.post(`${config.apiUrl}/campaigns/${data.id}`, formDataToSend, { headers: { 'Content-Type': 'multipart/form-data' }});
        alert('Campaign updated successfully');
        navigate('/');
      } catch (error) {
        console.error('Error updating campaign:', error);
      }finally {
        setTimeout(()=>{
          setLoading(false);
        }, 1500)
      }
    }
  };

 
  return (
    <>
      <button className='link-btn'> <Link to="/">View Campaigns</Link> </button>
      <div className="form-container">
        <div className='heading'>{id ? 'Edit Campaign' : 'Create New Campaign'}</div>

        {loading && <div className='spinner-overlay'><div className="spinner"></div></div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name <span>*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className='error'>{errors.name}</div>}
          </div>

          <div className="form-group">
            <label>Start Date <span>*</span></label>
            <input
              type="date"
              name="from"
              value={formData.from}
              onChange={handleChange}
            />
            {errors.from && <div className='error'>{errors.from}</div>}
          </div>

          <div className="form-group">
            <label>End Date <span>*</span></label>
            <input
              type="date"
              name="to"
              value={formData.to}
              onChange={handleChange}
            />
            {errors.to && <div className='error'>{errors.to}</div>}
          </div>

          <div className="form-group">
            <label>Total Budget (USD) <span>*</span></label>
            <input
              type="number"
              name="total_budget"
              value={formData.total_budget}
              onChange={handleChange}
              step="0.01"
            />
            {errors.total_budget && <div className='error'>{errors.total_budget}</div>}
          </div>

          <div className="form-group">
            <label>Daily Budget (USD) <span>*</span></label>
            <input
              type="number"
              name="daily_budget"
              value={formData.daily_budget}
              onChange={handleChange}
              step="0.01"
            />
            {errors.daily_budget && <div className='error'>{errors.daily_budget}</div>}
          </div>

          <div className="form-group">
            <label>Creatives</label>
            <input
              type="file"
              name="creatives"
              onChange={handleFileChange}
              multiple
            />
          </div>

          <button type="submit">{id ? 'Update Campaign' : 'Create Campaign'}</button>
        </form>
      </div>
    </>
  );
};

export default EditForm;
