
const Fader = (active, progress, fadeThreshold) => {
    return (
        !active ? 0 :
        progress < fadeThreshold ? progress / fadeThreshold :
        progress > 1 - fadeThreshold ? (1 - progress) / fadeThreshold :
        1
    )
}

export default Fader