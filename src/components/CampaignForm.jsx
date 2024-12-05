import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';
import config from '../config';
import { Link } from 'react-router-dom';

const CampaignForm = () => {
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    from: '',
    to: '',
    total_budget: '',
    daily_budget: '',
    creatives: [],
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

      const form = new FormData();
      form.append('name', formData.name);
      form.append('from', formData.from);
      form.append('to', formData.to);
      form.append('total_budget', formData.total_budget);
      form.append('daily_budget', formData.daily_budget);

      for (const file of formData.creatives) {
        form.append('creatives[]', file);
      }
      setLoading(true)

      try {
        const response = await axios.post(`${config.apiUrl}/campaigns`, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Campaign created successfully')
        setFormData({
          name: '',
          from: '',
          to: '',
          total_budget: '',
          daily_budget: '',
          creatives: [],
        });
        // console.log('Campaign created successfully:', response.data);
      } catch (error) {
        console.error('Error creating campaign:', error);
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

      <div className='heading'>Create New Campaign</div>

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
        <div className="file-preview">
          {formData.creatives.length > 0 && (
            <p>{formData.creatives.length} file(s) selected</p>
          )}
        </div>

        <button type="submit">Create Campaign</button>
      </form>
    </div>
    </>
  );
};

export default CampaignForm;
