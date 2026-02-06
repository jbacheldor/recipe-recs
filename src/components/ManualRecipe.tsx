import { ChangeEvent, useState } from "react";

const style = {
    formBody: {
        margin: '0 20%',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    labels: {
        margin: '5px',
        display: 'flex',
        flexDirection: 'column'
    }
}

type ingredients = {
    amount: string, 
    type: string
}

type formType = {
    title: string,
    time: string,
    description: string,
    difficulty: string,
}

const initialForm = {
    title: '',
    time: '',
    description: '',
    difficulty: 'easy'
}

const ManualRecipe:React.FC = () => {
    const [form, setForm] = useState<formType>(initialForm)
    const [steps, setSteps] = useState<string[]>([''])
    const [ingredients, setIngredients] = useState<ingredients[]>([{amount: '', type: ''}])

    const onSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        
    }

    const updateForm = (e: React.ChangeEvent) => {
        setForm({
            ...form,
            [e.target.ariaLabel || '']: e.target.value
        })
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
                <label style={style.labels}>
                    title
                    <input aria-label="title" value={form.title} onChange={(e)=>updateForm(e)}></input>
                </label>
                <label style={style.labels}>
                    description
                    <textarea aria-label="description" value={form.description} onChange={(e)=>updateForm(e)} style={{border: '1px solid transparent', borderRadius: '8px', padding: '0.6em 1.2em', boxShadow: '0 2px 2px rgba(0, 0, 0, 0.2)'}}></textarea>
                </label> 
                <label  style={style.labels}>
                    estimated time
                    <input aria-label="time" value={form.time} onChange={(e)=>updateForm(e)}></input>
                </label>
                <label style={style.labels}>
                    difficulty level
                    <select aria-label="difficulty" value={form.difficulty} onChange={(e)=>updateForm(e)}>
                        <option>easy</option>
                        <option>medium</option>
                        <option>hard</option>
                    </select>
                </label>
                <div style={style.labels}>
                    <div>
                        <span>ingredients</span>
                        <button style={{padding: '0 3px', margin: '3px'}} onClick={()=>addNew('ingredients')}>+</button>
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
                <div style={{margin: '10px 0'}}>
                    <div>
                        <span>steps</span>
                        <button style={{padding: '0 3px', margin: '3px'}} onClick={()=>addNew('steps')}>+</button>
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

                <button style={{width: 'fit-content', margin: '10px'}}>submit</button>
            </form>
        </div>
    )
}

export default ManualRecipe;