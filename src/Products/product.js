import React from 'react';
import Loader from 'react-loader-spinner'
import './product.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const ProductList = () =>{
    const [productlist, setProductlist] = React.useState([])
    const [query, setQuery ] = React.useState({});
    const [loading, setLoading ] = React.useState(false);
    const getData = async ( objcts) =>{
        let params = {
            limit : 100
        }
       Object.assign(params , objcts)
        const queryString = new URLSearchParams(params).toString();
        setLoading(true)
        let data = await fetch (`https://api.spacexdata.com/v3/launches?${queryString}`);
        let item = await data.json ();
        setLoading(false)
        setProductlist(item);
    }

    React.useEffect( () =>{
        getData(query);
    },[query])

    const getYears = (startYear)=>{
        let years = [];
        let currentYear = new Date().getFullYear();
        startYear = startYear || 1980 ;
        for (startYear ; startYear <= currentYear; startYear++) {
            years.push(startYear);
        }

        return years
    }
    const filterByYear = (e)=>{
        e.preventDefault();
        // e.currentTarget.className += " act-bg";
        e.target.classList.toggle('act-bg');
        let year_filter = {
            launch_year : e.currentTarget.innerHTML
        }
        setQuery( oldquery => {
            return { ...oldquery , ...year_filter }
        })
    }
    const successLunchFilter = (e)=>{
        e.preventDefault();
        //let val = e.target.value ;
        let lunch = {
            launch_success : e.target.value
        }
        setQuery( oldquery => {
            return { ...oldquery , ...lunch }
        })
    }

    const succesfulLandingFliter = (e)=>{
        e.preventDefault();
        let landing = {
            land_success :e.target.value
        }
        setQuery (oldquery => {
            return {...oldquery, ...landing}
        })
    }
    if( loading){
        return ( <Loader className="loading" type="Rings" color="#00BFFF"  height={50} width={50} />)
    }
    return(
        <div className="container bg mt-5 mb-5">
            <h1 className="main-heading">SpaceX Launch Programs</h1>
            <div className="row">
                <div className="col-md-3">
                    <div className="left-box">
                        <h2>Filters</h2>
                        <h4>Launch Year</h4>
                        <hr/>
                            <div className="btn-part">
                                {
                                    getYears(2006).map( (item , index)=>{
                                        return (
                                            <button className="btn btn-success btn-bg w-45 m-1" key={index} 
                                             onClick={filterByYear}
                                            >{item}</button>
                                        )
                                    })
                                }
                               
                            </div>

                            <div className="success-launch">
                                <h4 className="mt-4">Successful Launch</h4>
                                <hr/>
                                <div className="btn-part">
                                    <button className="btn btn-success btn-bg w-45 m-1"
                                     onClick={successLunchFilter}
                                     value={ true}>True</button>
                                    <button className="btn btn-success btn-bg w-45 m-1"
                                     onClick={successLunchFilter}
                                     value={ false}>False</button>
                                </div>
                            </div>

                            <div className="success-landing">
                                <h4 className="mt-4">Successful Landing</h4>
                                <hr/>
                                <div className="btn-part">
                                    <button className="btn btn-success btn-bg w-45 m-1" value={true}
                                    onClick={succesfulLandingFliter}
                                    >True</button>
                                    <button className="btn btn-success btn-bg w-45 m-1" value={false}
                                    onClick={succesfulLandingFliter}
                                    >False</button>
                                </div>
                            </div>
                           
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="right-box">
                        <div className="row">
                       
                                
                            {(productlist.length > 0) ?
                                productlist.map((res, index) =>{
                                    return(
                                        <div className="col-md-3"  key={index}>
                                           <div className="box">
                                                <img src={res.links.mission_patch} />
                                                <h2> {res.mission_name} </h2>
                                                <h3> <b>Mission id :</b> {res.mission_id} </h3>
                                                <h3> <b>Launch Year :</b>{res.launch_year} </h3>
                                                <h3> <b>Successful Launch :</b>{res.launch_success} </h3>
                                                <h3> <b>Successful Landing :</b>{res.rocket.rocket_id} </h3>
                                           </div>
                                        </div>
                                    );
                                })
                                : ''
                            }
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductList