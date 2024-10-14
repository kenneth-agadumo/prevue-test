import { Dropdown } from "./Dropdown"

export const HeroSearch = () => {


    return(
        <div className="hero-search-bar gap-5 " style={{width: '100%'}}>
            <div className="dropdown-1">
                <label style={{ padding: '0 3px' }} htmlFor="">Category</label>
                <Dropdown itemNumber={3} placeholder={'Category'} itemsArray={[ 'All', 'Rentals', 'Restaurants']} width={'200px'} border={'none'} isSearchable={false} />
            </div>
            <div className="dropdown-2">
                <label style={{ padding: '0 3px' }} htmlFor="">Sub-category</label>
                <Dropdown itemNumber={4} placeholder={'Sub-Category'} itemsArray={['All', 'Popular', 'Recent']} width={'200px'} border={'none'} isSearchable={false}/>
            </div>
            <div className="dropdown-3">
                <label style={{ padding: '0 3px' }} htmlFor="">Location</label>
                <Dropdown itemNumber={3} placeholder={'Location'} itemsArray={[ 'Type 1', 'Type 2']} width={'200px'} border={'none'} />
            </div>
            <div className="s-button">
                <button className="hero-search-button justify-center grid items-center"><img src="search-white.svg" alt="" /></button>
            </div>
        </div>
    )
}

