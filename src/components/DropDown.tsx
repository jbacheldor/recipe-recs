import { useState } from "react"


type Props = {
    options: string[],
    title?: string,
    onSelect?: () => void,
    selected: string[]
}

const style = {
    filter: {
        display: 'block',
        scrollY: 'true',
        height: '300px',

        // overflowY: 'true'
    },
    inside: {
        display: 'flex',
        'flexDirection': 'column',
        width: '200px',
        padding: '10px'
    },
    options: {
        display: 'flex',
        'flexDirection': 'column'   
    }
}

const DropDown:React.FC<Props> = ({options, selected}) => {
    const [select, setSelected] = useState(selected)
    const [filtered, setFiltered] = useState<string[]>([])
    const [searchString, setSearch] = useState('')

    const onUpdate = (key: string) => {
        if(select.includes(key)) {
            setSelected(select.filter((item)=> item != key))
        }else {
            setSelected([...select, key])
        }
    }

    const searchFilter = (value: string) => {
        const text = value.toLowerCase()
        setSearch(text)

        if(value == '') {
            setFiltered([]) 
            return
        } 

        const re = new RegExp(`${text}`);
        let foundList: string[] = []

        options.forEach((i)=> {
            const found = re.exec(i)
            console.log('found', found)
            if(found) foundList.push(i)
        })

        setFiltered(foundList)
    }

    return (
        <div id="filter" style={style.filter}>
            <div id="inside" style={style.inside}>
            <hr/>
            <input placeholder="weeee" onChange={(e)=> searchFilter(e.target.value)}/> 
            <div id="options" style={style.options}>
            {searchString != '' && filtered.length == 0 &&
                <p>no results found</p>
            }
            {filtered.length > 0 && filtered.map((key)=> {
                return (
                    <label>
                        <input checked={select.includes(key)} onChange={()=> onUpdate(key)} type='checkbox' value={key}/>
                        {key}
                    </label>
                )
            })
            }
            {searchString == '' && options.map((key)=> {
                return (
                    <label>
                        <input checked={select.includes(key)} onChange={()=> onUpdate(key)} type='checkbox' value={key}/>
                        {key}
                    </label>
                )
            })}
            </div>
            </div>
        </div>
    )
}

export default DropDown;