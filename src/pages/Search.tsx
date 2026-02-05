import { useState } from "react";
import DropDown from "../components/DropDown"
import RecipeCard from "../components/RecipeCard";


const style = {
    filters: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: '0px 20px'
    },
    searchBar: {
        display: 'flex',
        flexDirection: 'row',
        margin: '20px',
        width: '100%',
        justifyContent: 'center'
    },
    dataBody: {
        display: 'flex',
        flexDirection: 'column',
        margin: '5% 20%',
        justifyContent: 'center',
    }

}

type filtersType = {
    title: string,
    options: string[],
    selected: string[]
}



const SearchPage:React.FC = () => {
    const [openFilter, setOpenFilter] = useState('')

    const adjustFilters = (value: string) => {
        if(openFilter == value) setOpenFilter('')
        else setOpenFilter(value)
    }

    const [filters, setFilters] = useState<filtersType[]>([
        {
            title: 'tags',
            options: ['rabbit', 'cow', 'emow', 'whee', 'trial', 'and', 'error'],
            selected: []
        },
        {
            title: 'allergy',
            options: [],
            selected: []
        }, 
        {
            title: 'time',
            options: [],
            selected: []
        },
        {
            title: 'ingredients',
            options: [],
            selected: []
        }
    ])


    const onUpdateFilters = (selected: string[], title: string) => {
        const copy = filters.slice()

        const index = copy.findIndex((value)=> value.title == title)
        copy[index].selected = selected

        setFilters(copy)
    }

    return (
        <div>
            <h3 style={{textAlign: 'center'}}>Search</h3>
            <div id="searchBar" style={style.searchBar}>
                <input placeholder="eeee" style={{width: '60%', marginRight: '10px'}}/>
                <button style={{padding: '0 30px'}}>Search</button>
            </div>
            <div id="filters" style={style.filters}>
                {filters.map((val)=> {
                    return (
                        <div>
                            <button onClick={()=> adjustFilters(val.title)}>{val.title}</button>
                            {openFilter == val.title &&
                                <DropDown onSelect={(item)=>onUpdateFilters(item, val.title)} options={val.options} selected={val.selected}/>
                            }
                        </div>
                    )
                })}
            </div>
            <hr/>
            <div style={style.dataBody}>
                <RecipeCard title={'wittle test'} tags={['honk', 'beep', 'meow']} time={'10'}/>
                <RecipeCard title={'wittle test'} tags={['honk', 'beep', 'meow']} time={'10'}/>
                <RecipeCard title={'wittle test'} tags={['honk', 'beep', 'meow']} time={'10'}/>
                <RecipeCard title={'wittle test'} tags={['honk', 'beep', 'meow']} time={'10'}/>
               <RecipeCard title={'wittle test'} tags={['honk', 'beep', 'meow']} time={'10'}/>
            </div>
            <div>
                pagination here
            </div>
        </div>
    )
}

export default SearchPage;