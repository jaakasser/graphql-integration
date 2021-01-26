const users = [
	{
		id: 1,
		firstName: 'Chuck',
		lastName: 'Norris',
		status: 'ACTIVE',
	},
	{
		id: 2,
		firstName: 'John',
		lastName: 'Rambo',
		status: 'DELETED',
	},
];

module.exports = {
	Query: {
		user: (_parent, args) => users.find((user) => user.id == args.id),
		userList: () => users,
	},

	Mutation: {
		updateUserStatus: (_parent, args) => {
			const user = users.find((user) => user.id == args.id);

			if (!user) {
				throw new Error(`No user with id ${args.id} found`);
			}

			user.status = args.status;

			return user;
		},
	},
};
