import { useState } from "react"

type Props = {
    options: string[],
    title?: string,
    onSelect: (val: string[]) => void,
    selected: string[],
}

const style = {
    filter: {
        display: 'block',
        // scrollY: 'true',
        // maxHeight: '200px',
        position: 'absolute',
        backgroundColor: '#f6f6f6',
        borderRadius: '5px',
        border: '1px black solid',
        marginTop: '5px',
        padding: '5px',
        // overflowY: 'hidden'
    },
    inside: {
        display: 'flex',
        'flexDirection': 'column',
        width: '200px',
        padding: '10px',
        marginBottom: '5px'
    },
    options: {
        display: 'flex',
        'flexDirection': 'column',
        overflowY: 'scroll',
        maxHeight: '100px'
    },
    buttons: {
        padding: '5px',
        margin: '0 10px'
    },
    buttonGr: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '5px 10px'
    }
}

const DropDown:React.FC<Props> = ({options, selected, onSelect}) => {
    const [select, setSelected] = useState(selected)
    const [filtered, setFiltered] = useState<string[]>([])
    const [searchString, setSearch] = useState('')


    const onUpdate = (key: string) => {
        let newVal = []
        if(select.includes(key)) {
            newVal = select.filter((item)=> item != key)
            setSelected(newVal)
        }else {
            newVal = [...select, key]
            setSelected(newVal)
        }

        onSelect(newVal)
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

    const onClear = () => {
        setSelected([])
        onSelect([])
    }

    const selectAll = () => {
        setSelected(options)
        onSelect(options)
    }

    return (
        <div>
            <div id="filter" style={style.filter}>
                <div id="inside" style={style.inside}>
                <input style={{margin: '5px'}} placeholder="weeee" onChange={(e)=> searchFilter(e.target.value)}/>
                <div style={style.buttonGr}>
                    <button onClick={()=> onClear()} style={style.buttons}>clear</button> 
                    <button onClick={()=>selectAll()} style={style.buttons}>select all</button>
                </div>
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
        </div>
    )
}

export default DropDown;