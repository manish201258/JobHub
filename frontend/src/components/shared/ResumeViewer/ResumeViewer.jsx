import { useState } from 'react';
import './ResumeViewer.css'
const ResumeViewer = ({ resumeUrl, fileName }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeViewer, setActiveViewer] = useState(null);

    const handleView = async (viewerType) => {
        setLoading(true);
        setError(null);
        setActiveViewer(viewerType);

        try {
            // First verify the URL is accessible
            const test = await fetch(resumeUrl, { method: 'HEAD' });
            if (!test.ok) throw new Error('PDF not accessible');

            // Construct viewer URL based on type
            let viewerUrl;
            switch(viewerType) {
                case 'google':
                    viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(resumeUrl)}&embedded=true`;
                    break;
                default:
                    throw new Error('Invalid viewer type');
            }

            // Open in new tab
            const newWindow = window.open('', '_blank');
            if (newWindow) {
                newWindow.location.href = viewerUrl;
            } else {
                throw new Error('Popup blocked. Please allow popups for this site.');
            }
        } catch (err) {
            setError(`Failed to load PDF: ${err.message}`);
            console.error('PDF loading error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="resume-viewer-container">
            <div className="viewer-options">
                <button 
                    onClick={() => handleView('google')}
                    disabled={loading && activeViewer === 'google'}
                    className={`viewer-btn ${activeViewer === 'google' ? 'active' : ''}`}
                >
                    {loading && activeViewer === 'google' ? 'Loading...' : 'View with Google'}
                </button>
                
                {/* <button 
                    onClick={() => handleView('pdfjs')}
                    disabled={loading && activeViewer === 'pdfjs'}
                    className={`viewer-btn ${activeViewer === 'pdfjs' ? 'active' : ''}`}
                >
                    {loading && activeViewer === 'pdfjs' ? 'Loading...' : 'View with PDF.js'}
                </button> */}
                
                {/* <a
                    href={`${resumeUrl.replace('upload/', 'upload/fl_attachment/')}`}
                    download={fileName}
                    className="download-btn"
                >
                    Download Directly
                </a> */}
            </div>
            
            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={() => handleView(activeViewer)}>Retry</button>
                </div>
            )}
            
            {/* Fallback iframe for direct viewing */}
            {activeViewer === 'direct' && !error && (
                <iframe 
                    src={resumeUrl}
                    title="PDF Viewer"
                    className="pdf-iframe"
                />
            )}
        </div>
    );
};

export default ResumeViewer;