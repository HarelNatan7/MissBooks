
export const surveyService = {
    getById
}

function getById() {
    return Promise.resolve(survey)
}

var survey =
{
    title: 'Pet Shopping',
    cmps: [
        {
            type: 'textBox',
            id: 'p101',
          
        },
        {
            type: 'textArea',
            id: 'p109',
           
        },
        {
            type: 'selectBox',
            id: 'p102',
            opts: ['Great', 'Fine', 'Crap', 'Worst Ever']
            
        },
        {
            type: 'selectBox',
            id: 'p103',
            info: {
                label: 'Pick one',
                opts: ['Puk', 'Muk', 'Luk']
            }
        }
       
    ]
}