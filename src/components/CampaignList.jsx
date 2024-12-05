import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style.css';
import config from '../config';
import { Link } from 'react-router-dom';
import Modal from './Modal';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
   
    const fetchCampaigns = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${config.apiUrl}/campaigns?page=${currentPage}`);
        setCampaigns(response.data.data);
        setTotalPages(response.data.last_page);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }finally {
        setTimeout(()=>{
          setLoading(false);
        }, 1500)
      }
    };

    fetchCampaigns();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const openModal = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCampaign(null);
  };
  

  return (
    <div className="campaign-list-container">
      <div className='heading'>Advertising Campaigns</div>
      <button className='link-btn'> <Link to="/create">Create Campaign</Link> </button>
      {loading && <div className='spinner-overlay'><div className="spinner"></div></div>}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Budget (USD)</th>
              <th>Daily Budget (USD)</th>
              <th>Creatives</th>
            </tr>
          </thead>
          <tbody>
            
              {campaigns.length === 0 ? (
                <tr><td colSpan="6" className='empty'>No campaigns found</td></tr>
              ) : (
                campaigns.map((campaign) => (
                  <tr key={campaign.id} className="campaign-item">
                    <td>{campaign.name}</td>
                    <td>{campaign.from}</td>
                <td>{campaign.to}</td>
                <td>{campaign.total_budget}</td>
                <td>{campaign.daily_budget}</td>
                <td>
                  
                  {campaign.creatives && campaign.creatives.length > 0 ? (
                       
                        <div>
                          {campaign.creatives.map((creative, index) => (

                            <a href={`${config.url}/storage/${creative.path}`}
                            className='creative-links'
                            key={index}
                            onClick={(e) => {
                              e.preventDefault();
                              openModal(creative.path);
                            }}
                          > {creative.file_name}
                          
                          </a>
                          ))}
                        </div>
                      
                    ) : (
                      <p>No creatives available for this campaign.</p>
                    )}
                </td>
              </tr>
                ))
              )}
        
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <span> {currentPage} of {totalPages}</span>
        <div className='btn-container'>
          <button className='link-btn pagination-btn' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <button className='link-btn pagination-btn' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
      
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        campaign={selectedCampaign}
      />
    </div>
  );
};

export default CampaignList;

