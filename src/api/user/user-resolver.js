const users = require('../../data/users');

module.exports = {
	Query: {
		user: (_parent, args) => users.find((user) => user.id == args.id),
		userList: () => ({ rows: users, totalRows: users.length }),
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
