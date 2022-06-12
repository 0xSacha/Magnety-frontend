export const toDataUrl = (file: File) : Promise<string> => { 
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onloadend = function() {
            resolve(reader.result as string)
        }
        reader.onerror = reject;
        reader.readAsDataURL(file);
    })
}