const ListCategory = {
    render: (props) => {
        return `
            <div class="side-bar">
                <ul class="category">
                    <li class="${props.selected === 'coffee' ? 'selected' : ''}">
                        <a href="/#/">Coffee</a>
                    </li>
                    <li class="${props.selected === 'tra' ? 'selected' : ''}">
                        <a href="/#/">Trà</a>
                    </li>
                    <li class="${props.selected === 'freeze' ? 'selected' : ''}">
                        <a href="/#/">Freeze</a>
                    </li>
                    <li class="${props.selected === 'banh' ? 'selected' : ''}">
                        <a href="/#/">Bánh</a>
                    </li>
                </ul>
            </div>
        `
    }
}

export default ListCategory;