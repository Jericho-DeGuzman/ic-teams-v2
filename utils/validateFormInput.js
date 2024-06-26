export function validateTargetForm(input) {
    return new Promise((resolve, reject) => {
        const { title, category_uuid, description, distribution, start_date, end_date, no_end_date, target_type } = input;

        !category_uuid && reject(new Error('Please select target category'));

        title == '' && reject(new Error('Please enter target title'));

        description == '' && reject(new Error('Please enter target description'));

        distribution.length == 0 && reject(new Error('Please select Division/Distribution Groups'));

        start_date == '' && reject(new Error('Please choose target start date'));

        if (!no_end_date) end_date == '' && reject(new Error('Please select target end date'));

        resolve();
    })
}

export function validateTaskForm(input) {
    return new Promise((resolve, reject) => {
        const { title, description, due_date } = input;

        title == '' && reject(new Error('Please enter task title'));

        description == '' && reject(new Error('Please enter task description'));

        due_date == ''  && reject(new Error('Please enter task due data'));

        resolve();
    })
}