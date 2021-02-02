const users = require('../../data/users');

module.exports = {
	Query: {
		user: (_parent, args) => users.find((user) => user.id == args.id),
		userList: (_parent, args) => {
			const { skip, take, filter } = args;

			let result = users;

			if (filter.status) {
				result = result.filter((u) => u.status === filter.status);
			}

			// Skip and take are used for pagination
			result = result.slice(skip, take);

			return {
				rows: result,
				totalRows: result.length,
			};
		},
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
