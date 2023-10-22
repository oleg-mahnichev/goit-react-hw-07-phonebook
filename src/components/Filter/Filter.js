import PropTypes from "prop-types";
import { CenteredContainer, Label, Input } from "./Filter.style"; // Import styled components from your style file

export const Filter = ({ input }) => {
    return (
        <CenteredContainer>
            <Label htmlFor="name">Find contacts by name</Label>
            <Input
                type="text"
                id="name"
                name="name"
                onChange={input}
                placeholder="Name"
            />
        </CenteredContainer>
    );
};

Filter.propTypes = {
    input: PropTypes.func,
};
