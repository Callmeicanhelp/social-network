


const thought = new thoughtSchema(
    {
        toughtText:{
            type: String,
            required: true,
            validate: [({ length }) => length >= 1, 'thought should be longer.']
        },
    }
)