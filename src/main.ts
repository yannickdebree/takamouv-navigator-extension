function onChange(){
    console.log("change");    
}

function main(){
    const form = document.querySelector('form');

    if(!form){
        return new Error();
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
    });

    form.addEventListener('change', event => {
        console.log({event});            
    });
}

main();