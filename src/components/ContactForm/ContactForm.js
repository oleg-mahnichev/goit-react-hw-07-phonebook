import PropTypes from "prop-types";
import { Form, Label, Input, Button } from './ContactForm.style';
import { addContact, fetchContacts } from "../../redux/operations";


export const submit = async (evt, dispatch) => {
    const formReset = () => {
        evt.target.name.value = ""
        evt.target.querySelector('input[type="tel"]').value = ""
    }


    await dispatch(addContact({ name: evt.target.name.value, number: evt.target.querySelector('input[type="tel"]').value }))

    await dispatch(fetchContacts())

    await formReset()
}



export const ContactForm = ({ formSubmit }) => {

    const handleNameChange = (e) => {
        // Allow letters, spaces, apostrophes, and dashes
        const input = e.target.value.replace(/[^a-zA-Zа-яА-Я\s'-]/g, "");

        // Remove consecutive spaces, apostrophes, and dashes
        const formattedInput = input.replace(/['\s-]+/g, ' ');

        e.target.value = formattedInput.trim(); // Remove leading and trailing spaces
    };

    const handlePhoneNumberChange = (e) => {
        const input = e.target.value.replace(/[^0-9]/g, ''); // Залишити лише цифри
        let formattedInput = '';

        if (input.length >= 3) {
            formattedInput += input.substr(0, 3);
            if (input.length >= 6) {
                formattedInput += '-' + input.substr(3, 3);
                if (input.length >= 10) {
                    formattedInput += '-' + input.substr(6, 4);
                } else {
                    formattedInput += '-' + input.substr(6);
                }
            } else {
                formattedInput += '-' + input.substr(3);
            }
        } else {
            formattedInput = input;
        }

        e.target.value = formattedInput;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        formSubmit(e);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Label>
                Name
                <Input
                    type="text"
                    name="name"
                    // pattern="^[a-zA-Zа-яА-Я]+([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*$"
                    title="Name may contain only letters, apostrophe, dash, and spaces. For example: Mike , Le Clerc "
                    placeholder="Name Surname"
                    required
                    onInput={handleNameChange}
                />
                Phone
                <Input
                    type="tel"
                    name="number"
                    // pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    placeholder="ххх-xxx-xxxx"
                    required
                    onInput={handlePhoneNumberChange}
                />
                <Button type="submit">Add contact</Button>
            </Label>
        </Form>
    );
};

ContactForm.propTypes = {
    formSubmit: PropTypes.func
};
