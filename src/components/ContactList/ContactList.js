import PropTypes from "prop-types";
import { ListByContact, ListItem, Button } from "./ContactList.style"; // Import styled components from your style file

export const ContactList = ({ contacts, filter, filtering, deleting }) => {
    const filteringByName = filtering();
    return (
        <ListByContact>
            {contacts.length > 0 ? (
                filter.length > 0 ? (
                    filteringByName.map((contact) => (
                        <ListItem key={contact.id}>
                            {contact.name}: {contact.number}
                            <Button type="button" id={contact.id} onClick={deleting}>
                                Delete
                            </Button>
                        </ListItem>
                    ))
                ) : (
                    contacts.map((contact) => (
                        <ListItem key={contact.id}>
                            {contact.name}: {contact.number}
                            <Button type="button" id={contact.id} onClick={deleting}>
                                Delete
                            </Button>
                        </ListItem>
                    ))
                )
            ) : (
                <li>You don't have any contacts yet</li>
            )}
        </ListByContact>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.array,
    filter: PropTypes.string,
    filtering: PropTypes.func,
    deleting: PropTypes.func,
};
