import { useState } from "react"
import ManualRecipe from "../components/ManualRecipe"

const style = {
    addBody: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0 10%',
        justifyContent: 'center',
    },
    methods: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '5px 10%',
    },
    fileUploads: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '5% 10%',
    }
}

type fileType = {
    lastModified: number,
    name: string,
    size: number,
    type: string,
    webkitRelativePath: string
}

const AddRecipe:React.FC = () => {
    const [addStyle, setStyle] = useState('')
    const [files, setFiles] = useState<fileType[] | null>([])
    const [errorMsg, setMsg] = useState('')
    const [links, setLinks] = useState<string[]>([])
    const [currentLink, setCurrent] = useState('')

    const updateStyle = (val: string) => {
        setStyle(val)
    }

    const onFileUpload = (e: React.ChangeEvent, type: string) => {
        const filesLoaded = e.target.files

        let keys = Object.keys(filesLoaded)
        
        let filtered: fileType[] = []

        keys.forEach((val)=> {
            let num = Number(val)
            if(type == 'picture') {
                if(filesLoaded[num].type == 'image/jpg' || 'image/png') filtered.push(filesLoaded[num])
                
                
            }
            if(type == 'file') {
                if(filesLoaded[num].type == 'application/json') filtered.push(filesLoaded[num])
            }
        })
        
        if(files) {
            const copy = files.slice()
            setFiles(copy.concat(filtered))
        }
    }

    const removeFiles = (index: number) => {
        if(files){
            const copy = files.slice()
            const first = files.slice(0, index)
            const second = files.slice(index+1, copy?.length)
            setFiles(first.concat(second))
        }
    }

    const addLinks = () => {
        setLinks([...links, currentLink])
        setCurrent('')
    }

    const removeLinks = (val: string) => {
        setLinks(links.filter((value) => val != value))
    }

    return (
        <div>
            <h3 style={{textAlign: 'center'}}>Upload / Add</h3>
            <div style={style.addBody}>
                <span style={{textAlign: 'center', margin: '5px'}}>Please select your upload method below</span>
                <div style={style.methods}>
                    <button onClick={()=>updateStyle('picture')}>upload picture</button>
                    <button onClick={()=>updateStyle('file')}>upload file</button>
                    <button onClick={()=>updateStyle('manual')}>manual add</button>
                    <button onClick={()=>updateStyle('link')}>from link</button>
                </div>
            </div>
             <hr/>
            {addStyle == 'manual' &&
                <ManualRecipe/>
            }
            {addStyle == 'file' && 
                <div style={style.fileUploads}>
                    <span>Select this option if you have a json or txt file specifically for this app!</span>
                    <input onChange={(e)=>onFileUpload(e, 'file')} type='file' accept=".json, .txt" multiple/>
                    {files && files.map((val, index)=> {
                        return (
                            <div>
                                <label>
                                    {val.name}
                                    <button onClick={()=> removeFiles(index)}>-</button>
                                </label>
                                </div>
                        )
                    })
                    }
                    <button>submit</button>
                </div>
            }
            {addStyle == 'picture' &&
                <div style={style.fileUploads}>
                    <span>This option is great if you have a physical copy of a recipe that you want to scan in!</span>
                    <input onChange={(e)=>onFileUpload(e, 'picture')} type='file' accept="image/jpeg, image/png" multiple/>
                    {files && files.map((val, index)=> {
                        return (
                            <div>
                                <label>
                                    {val.name}
                                    <button onClick={()=> removeFiles(index)}>-</button>
                                </label>
                                </div>
                        )
                    })
                    }
                    <button>submit</button>
                </div>
            }
            {addStyle == 'link' && 
                <div style={style.fileUploads}>
                    <label>
                        <input placeholder="put link here" value={currentLink} onChange={(e)=> setCurrent(e.target.value)}/>
                        <button onClick={()=> addLinks()}>add link</button>
                    </label>
                    {links && links.map((val) => {
                        return (
                            <div>
                                <span>{val}</span>
                                <button onClick={()=>removeLinks(val)}>-</button>
                            </div>
                        )
                    })}
                    <button>submit</button>
                    {/* when done say like, thanks we'll process this and get back to you! */}
                </div>
            }
        </div>
    )
}

export default AddRecipe