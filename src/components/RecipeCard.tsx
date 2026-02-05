
const style = {
    card: {
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '10px',
        margin: '10px',
        padding: '10px',
    },
    tag: {
        padding: '2px 5px',
        margin: '2px 5px',
        border: '1px solid black',
        borderRadius: '20px'
    },
    bottom: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}

type Props = {
    title: string,
    tags: string[],
    time: string, 
    source?: string
}

const RecipeCard:React.FC<Props> = ({title, tags, time, source}) => {

    return (
        <div style={style.card}>
            <div style={style.top}>
                <h3 style={{margin: '5px'}}>{title}</h3>
            <div>
                {tags.map((key)=> {
                    return ( 
                        <span style={style.tag}>{key}</span>
                    )
                })}
            </div>
            </div>
            <p style={{margin: '5px'}}>description here orum ipsoum lorum ispum ipsum fancy free ipusm lorum</p>
            <div id="bottom" style={style.bottom}>
                <span>Estimated Time: {time}</span>
                <span>Source: {'whatatat'}</span>
            </div>
        </div>
    )
}

export default RecipeCard;