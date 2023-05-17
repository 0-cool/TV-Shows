/* eslint-disable react/prop-types */
import { useFetch } from '../useFetch';

function TVShowDetails(props) {
    const { data, loading, error } = useFetch("https://www.episodate.com/api/show-details?q="+props.showId);
    return (
      <>
      <div>
        {error && <li>Error: {error}</li>}
        {loading ? <li>Loading...</li> :
        (
        <ul className='details-show' key={data.tvShow.id}>
            {data.tvShow.name && <li>Name: <label>{data.tvShow.name}</label></li>}
            {data.tvShow.start_date && <li>Start Date: <label>{data.tvShow.start_date}</label></li>}
            {data.tvShow.rating != 0 && <li>Rating: <label>{data.tvShow.rating}</label></li>}
            {data.tvShow.network && <li>Network: <label>{data.tvShow.network}</label></li>}
            {data.tvShow.genres.length > 0 && 
            <li>Genres:
                <ul>
                    {data.tvShow.genres?.map((g, id) => (
                        id < 3 ? <li key={id}>{g}</li> : ''
                    ))}
                </ul>
            </li>
            }
            {data.tvShow.description_source &&  
            <li><a target="_blank" rel="noreferrer" href={data.tvShow.description_source}>Full Description</a></li> }
            {data.tvShow.url && <li><a target="_blank" rel="noreferrer" href={data.tvShow.url}>Watch the movie</a></li> }
        </ul>
        )
        }
    </div>
      </>
    )
}
export default TVShowDetails;