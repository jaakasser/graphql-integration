const users = require('../../data/users');
const { createTestServer } = require('../../tests/utils');
const { gql } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');

const getUser = gql`
	query User($id: ID!) {
		user(id: $id) {
			id
			firstName
			lastName
			status
		}
	}
`;

const getUserList = gql`
	query Users {
		userList {
			rows {
				id
				firstName
				lastName
				status
			}
			totalRows
		}
	}
`;

const updateUser = gql`
	mutation UpdateUser($id: ID!, $status: UserStatus!) {
		updateUserStatus(id: $id, status: $status) {
			id
		}
	}
`;

let client;

beforeAll(() => {
	const { server } = createTestServer();

	client = createTestClient(server);
});

test('Get user with id 1', async () => {
	const res = await client.query({ query: getUser, variables: { id: 1 } });

	expect(res.data.user).toEqual(users[0]);
});

test('Get all users', async () => {
	const res = await client.query({ query: getUserList });

	expect(res.data.userList.rows).toEqual(users);
	expect(res.data.userList.totalRows).toEqual(users.length);
});

test('Update user status', async () => {
	const user = await client.query({ query: getUser, variables: { id: 1 } });

	expect(user.data.user.status).toBe('ACTIVE');

	await client.mutate({ mutation: updateUser, variables: { id: 1, status: 'DELETED' } });

	const afterUpdate = await client.query({ query: getUser, variables: { id: 1 } });

	expect(afterUpdate.data.user.status).toBe('DELETED');
});
