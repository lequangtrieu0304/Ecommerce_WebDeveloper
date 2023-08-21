const ListDashboard = {
    render: (props) => {
        return `
            <div class="side-bar">
                <ul class="category">
                    <li class="${props.selected === 'orders' ? 'selected' : ''}">
                        <a href="/#/admin">Orders</a>
                    </li>
                    <li class="${props.selected === 'product' ? 'selected' : ''}">
                        <a href="/#/product">Products</a>
                    </li>
                    <li class="${props.selected === 'profile' ? 'selected' : ''}">
                        <a href="/#/profile">Profile</a>
                    </li>
                    <li class="${props.selected === 'summary' ? 'selected' : ''}">
                        <a href="/#/summary">Summary</a>
                    </li>
                </ul>
            </div>
        `
    }
}

export default ListDashboard;