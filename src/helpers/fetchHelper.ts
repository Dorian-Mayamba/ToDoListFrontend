const FetchHelper = async <T,> (url : string, options : RequestInit) => {
    try{
        var response = await fetch(url, options);
        if (response.status == 204){
            return {response};
        }
        var data : T = await response.json();
        console.log(data);
        return {data};
    } catch (error) {
        throw error;
    }
}

export default FetchHelper;