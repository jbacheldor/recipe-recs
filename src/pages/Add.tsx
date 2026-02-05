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
    }
}

const AddRecipe:React.FC = () => {
    const [addStyle, setStyle] = useState('')

    const updateStyle = (val: string) => {
        setStyle(val)
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
                <div>
                    option to select file or manually paste it in
                </div>
            }
            {addStyle == 'picture' &&
                <div>
                    <input type='file' accept=".pdf"/>
                </div>
            }
            {addStyle == 'link' && 
                <div>
                    <label>
                        <input placeholder="put link here"/>
                    </label>
                    <button>submit</button>
                    {/* when done say like, thanks we'll process this and get back to you! */}
                </div>
            }
        </div>
    )
}

export default AddRecipe