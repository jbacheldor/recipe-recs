import { ChangeEvent, useState } from "react";

const style = {
    formBody: {
        margin: '0 20%',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    }
}

type ingredients = {
    amount: string, 
    type: string
}

const ManualRecipe:React.FC = () => {
    const [form, setForm] = useState('')
    const [steps, setSteps] = useState<string[]>([])
    const [ingredients, setIngredients] = useState<ingredients[]>([{amount: '', type: ''}])

    const onSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
    }

    const addNew = (val: string) => {
        if(val == 'steps') {
            setSteps([...steps, ''])
        }
        else {
            setIngredients([...ingredients, {amount: '', type: ''}])
        }
    }

    const removeStep = (index: number) => {     
        let first = steps.slice(0, index)
        let second = steps.slice(index+1, steps.length)
        setSteps(first.concat(second))
    }

    const removeIngredient = (index: number) => {
        let first = ingredients.slice(0, index)
        let second = ingredients.slice(index+1, ingredients.length)
        setIngredients(first.concat(second))
    }

    const updateIngredient = (e: React.ChangeEvent, index: number) => {
        let copy = ingredients.slice()
        copy[index] = {
            ...copy[index], 
            [e.target.ariaLabel || '']: e.target.value
        }

        setIngredients(copy)
    }

    const update = (e: ChangeEvent, index: number) => {
        e.preventDefault()
        let copy = steps.slice()

        copy[index] = e.target.value
        setSteps(copy)
    }

    return (
        <div style={style.formBody}>
            <p>please manually input your recipe here and then select done when you are finished</p>
            <form onSubmit={(e)=> onSubmit(e)} style={style.form}>
                <label>
                    title
                    <input></input>
                </label>
                <label>
                    description
                    <textarea></textarea>
                </label> 
                <label>
                    estimated time
                    <input></input>
                </label>
                <label>
                    difficulty level
                    <select>
                        <option>easy</option>
                        <option>medium</option>
                        <option>hard</option>
                    </select>
                </label>
                <div>
                    <div>
                        <span>ingredients</span>
                        <button onClick={()=>addNew('ingredients')}>+</button>
                    </div>
                    {ingredients.map((key, index)=>  {
                        return (
                            <div>
                                <label>
                                    amount:
                                    <input style={{maxWidth: '3ch'}} aria-label={'amount'}  onChange={(e)=>updateIngredient(e, index)} value={key.amount}/>
                                </label>
                                <label>
                                    <input value={key.type} aria-label={'type'}  onChange={(e)=>updateIngredient(e, index)}/>
                                </label>
                                 <button onClick={()=>removeIngredient(index)}>-</button>
                            </div>
                           
                        )
                        })}
                </div>
                <div>
                    <div>
                        <span>steps</span>
                        <button onClick={()=>addNew('steps')}>+</button>
                    </div>
                    {steps.map((key, index)=>  {
                        return (
                            <div>
                                <span>{index+1}.</span>
                                <label>
                                    <input value={key} onChange={(e)=> update(e, index)}/>
                                </label>
                                 <button onClick={()=>removeStep(index)}>-</button>
                            </div>
                        )
                        })}
                </div>

                <button >submit</button>
            </form>
        </div>
    )
}

export default ManualRecipe;