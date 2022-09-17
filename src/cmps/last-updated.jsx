export function LastUpdated({ lastUpdated }) {
    //1663325644752
    //1663365269898
    //1663371422099
    //1663199753073
    //1663091776159
    let date = new Date(lastUpdated)
    function timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000) 

        var interval = seconds / 31536000 

        if (interval > 1) {
            return Math.floor(interval) + " years ago" 
        }
        interval = seconds / 2592000 
        if (interval > 1) {
            return Math.floor(interval) + " months ago" 
        }
        interval = seconds / 86400 
        if (interval > 1) {
            return Math.floor(interval) + " days ago" 
        }
        interval = seconds / 3600 
        if (interval > 1) {
            return Math.floor(interval) + " hours ago" 
        }
        interval = seconds / 60 
        if (interval > 1) {
            return Math.floor(interval) + " minutes ago" 
        }
        // return Math.floor(seconds) + " seconds" 
        return " Just now " 
    }
    // var aDay = 24 * 60 * 60 * 1000 
    // console.log(Date.now() - aDay)
    // console.log(timeSince(new Date(Date.now() - aDay))) 
    // console.log(timeSince(new Date(Date.now() - aDay * 2))) 

    return (
    <div className="last-updated">{timeSince(lastUpdated)} </div>
)
}