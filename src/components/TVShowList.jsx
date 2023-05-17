import TVShowDetails from './TVShowDetails';
import { useEffect, useState } from "react";
import loader from '../assets/loader.png';

function TVShowList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [search, setSearch] = useState('');

  useEffect(() => {
    let url = "https://www.episodate.com/api/most-popular?page="+currentPage;
    if(search != ''){ url = "https://www.episodate.com/api/search?q=" + search + "&page="+currentPage; }
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch(() => setError(error))
      .finally(() => setLoading(false));
      
  }, [currentPage, error, search]);  
  
  return (
    <>
      <div className='search-section'>
        <input placeholder='Search' type="text" onChange={e => setSearch(e.target.value)} />
      </div>

      <div>
        <ul className='tv-shows'>
          {error && <li>Error: {error}</li>}
          {loading ? <li>Loading... <img className="loader" src={loader} /></li> :
          data.tv_shows?.map((show) => (
            <li key={show.id}>
              <div className="content-list">
                <div className='tv-shows_container front' style={{backgroundImage: `url(${show.image_thumbnail_path})`}}>
                </div>
                <div className="tv-shows_container_content back">
                    <TVShowDetails showId={show.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        <div className="pagination">
          {loading ? '' : 
            <>
              <div className='content'>
                Page {currentPage} of {data.pages} 
              </div>
              <button className={currentPage <= 1 ? 'disabled' : ''} onClick={() => setCurrentPage(currentPage - 1)}>Preview</button>
              <button className={currentPage == data.pages ? 'disabled' : ''} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </>
          }
      </div>
      </div>
    </>
  )
}

export default TVShowList