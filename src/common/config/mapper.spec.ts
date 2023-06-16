import {
  getSourceAccountId,
  getTargetRoleName,
  mapConfig,
} from './mapper';

it('should map to default group', () => {
  const stored = {
    'foo': {
      aws_account_id: 'foo',
      role_name: 'bar'
    },
    'profile bar': {
      aws_account_id: 'foo',
      role_name: 'bar',
      region: 'us-east-1'
    },
    'baz profile': {
      role_arn: 'arn:aws:iam::123456789012:role/MyRole'
    }
  } as StoredConfig;
  const config = mapConfig(stored);
  expect(config).toMatchInlineSnapshot(`
[
  {
    "aws_account_id": "123456789012",
    "role_name": "MyRole",
    "title": "baz profile",
  },
  {
    "aws_account_id": "foo",
    "region": "us-east-1",
    "role_name": "bar",
    "title": "bar",
  },
  {
    "aws_account_id": "foo",
    "role_name": "bar",
    "title": "foo",
  },
]
`);
});

it('should map to default group', () => {
  const stored = {
    'source': {
      aws_account_id: 'org',
      target_role_name: 'UserRole'
    },
    'foo': {
      aws_account_id: 'foo',
      source_profile: 'source',
    },
  } as StoredConfig;
  const config = mapConfig(stored);
  expect(config).toMatchInlineSnapshot(`
[
  {
    "aws_account_id": "foo",
    "role_name": "UserRole",
    "source_profile_account_id": "org",
    "title": "foo",
  },
]
`);
});

it('should map to groups', () => {
  const stored = {
    'foo': {
      aws_account_id: 'foo',
      role_name: 'bar'
    },
    'bar': {
      aws_account_id: 'foo',
      role_name: 'bar',
      group: 'baz'
    },
  };
  const config = mapConfig(stored);
  expect(config).toMatchInlineSnapshot(`
[
  {
    "aws_account_id": "foo",
    "role_name": "bar",
    "title": "foo",
  },
  {
    "aws_account_id": "foo",
    "group": "baz",
    "role_name": "bar",
    "title": "bar",
  },
]
`);
});

it('should sort by groups', () => {
  const stored = {
    'foo': {
      aws_account_id: 'foo',
      role_name: 'ccc'
    },
    'bar': {
      aws_account_id: 'foo',
      role_name: 'bar',
      group: 'aaa'
    },
    'baz': {
      aws_account_id: 'foo',
      role_name: 'bar',
      group: 'bbb'
    },
  };
  const config = mapConfig(stored);
  expect(config).toMatchInlineSnapshot(`
[
  {
    "aws_account_id": "foo",
    "role_name": "ccc",
    "title": "foo",
  },
  {
    "aws_account_id": "foo",
    "group": "aaa",
    "role_name": "bar",
    "title": "bar",
  },
  {
    "aws_account_id": "foo",
    "group": "bbb",
    "role_name": "bar",
    "title": "baz",
  },
]
`);
});

it('should omit entries with missing account_id', () => {
  const stored = {
    'foo': {
      role_name: 'bar',
    },
    'bar': {
      aws_account_id: 'foo',
      role_name: 'bar',
    },
    'baz': 1337,
  };
  const config = mapConfig(stored as object as StoredConfig);
  expect(config).toMatchInlineSnapshot(`
[
  {
    "aws_account_id": "foo",
    "role_name": "bar",
    "title": "bar",
  },
]
`);
});

it('should omit entries with missing role_name', () => {
  const stored = {
    'foo': {
      aws_account_id: 'bar',
    },
    'bar': {
      aws_account_id: 'foo',
      role_name: 'bar',
    },
    'baz': 1337,
  };
  const config = mapConfig(stored as object as StoredConfig);
  expect(config).toMatchInlineSnapshot(`
[
  {
    "aws_account_id": "foo",
    "role_name": "bar",
    "title": "bar",
  },
]
`);
});

it('should omit entry with invalid role_arn', () => {
  const stored = {
    'foo': {
      role_arn: 'foo',
    },
    'bar': {
      aws_account_id: 'foo',
      role_name: 'bar',
    },
  };
  const config = mapConfig(stored as object as StoredConfig);
  expect(config).toMatchInlineSnapshot(`
[
  {
    "aws_account_id": "foo",
    "role_name": "bar",
    "title": "bar",
  },
]
`);
});

it('should extract role_name and aws_account_id from role_arn', () => {
  const stored = {
    'foo': {
      role_arn: 'arn:aws:iam::123456789012:role/MyRole',
    },
  };
  const config = mapConfig(stored as object as StoredConfig);
  expect(config).toMatchInlineSnapshot(`
[
  {
    "aws_account_id": "123456789012",
    "role_name": "MyRole",
    "title": "foo",
  },
]
`);
});

it('should map region', () => {
  const stored = {
    'foo': {
      aws_account_id: 'foo',
      role_name: 'bar',
      region: 'eu-central-1'
    },
  };
  const config = mapConfig(stored as object as StoredConfig);
  expect(config).toMatchInlineSnapshot(`
[
  {
    "aws_account_id": "foo",
    "region": "eu-central-1",
    "role_name": "bar",
    "title": "foo",
  },
]
`);
});

it('should not map invalid region', () => {
  const stored = {
    'foo': {
      aws_account_id: 'foo',
      role_name: 'bar',
      region: 'us-dummy-1'
    },
  };
  const config = mapConfig(stored as object as StoredConfig);
  expect(config).toMatchInlineSnapshot(`
[
  {
    "aws_account_id": "foo",
    "role_name": "bar",
    "title": "foo",
  },
]
`);
});

it('should sort correctly', () => {
  const stored = {
    'foo': {
      aws_account_id: 'foo',
      role_name: 'bar',
      group: 'b',
    },
    'bar': {
      aws_account_id: 'foo',
      role_name: 'bar',
      group: 'a',
    },
    'foo2': {
      aws_account_id: 'foo',
      role_name: 'bar',
      group: 'b',
    },
    'bar2': {
      aws_account_id: 'foo',
      role_name: 'bar',
      group: undefined,
    },
  };
  const config = mapConfig(stored as object as StoredConfig);
  expect(config).toMatchInlineSnapshot(`
[
  {
    "aws_account_id": "foo",
    "role_name": "bar",
    "title": "bar2",
  },
  {
    "aws_account_id": "foo",
    "group": "b",
    "role_name": "bar",
    "title": "foo",
  },
  {
    "aws_account_id": "foo",
    "group": "b",
    "role_name": "bar",
    "title": "foo2",
  },
  {
    "aws_account_id": "foo",
    "group": "a",
    "role_name": "bar",
    "title": "bar",
  },
]
`);
});

describe('should map color correctly', () => {
  test.each([
    ['#ffffff1f', '#FFFFFF'],
    ['#ffffff', '#FFFFFF'],
    ['#fff', '#FFFFFF'],
    ['ffffff1f', '#FFFFFF'],
    ['ffffff', '#FFFFFF'],
    ['fff', '#FFFFFF'],
    ['white', '#FFFFFF'],
  ])('test color %s', (colorInput, colorOutput) => {
    const config = mapConfig({
      foo: { 
        role_arn: 'arn:aws:iam::123456789111:role/MyRole',
        color: colorInput
      }
    });
    expect(config[0].color).toBe(colorOutput);
  });
});

describe('role_arn handling', () => {
  test.each([
    ['arn:aws:iam::123456789111:role/MyRole', 'MyRole'],
    ['arn:aws:iam::123456789111:role/user-role-abc-xyz', 'user-role-abc-xyz'],
    ['arn:aws:iam::123456789111:role/user_role_abc_xyz', 'user_role_abc_xyz'],
    ['arn:aws:iam::123456789111:role/user=role', 'user=role'],
    ['arn:aws:iam::123456789111:role/user.role', 'user.role'],
    ['arn:aws:iam::123456789111:role/user,role,foo', 'user,role,foo'],
    ['arn:aws:iam::123456789111:role/user@role-foo', 'user@role-foo'],
    ['arn:aws:iam::123456789111:role/userRole+11', 'userRole+11'],
  ])('test role_arn %s', (arn, role_name) => {
    const config = mapConfig({ foo: { role_arn: arn } });
    expect(config[0].aws_account_id).toBe('123456789111');
    expect(config[0].role_name).toBe(role_name);
  });
});


it('should get targetRoleName from source1', () => {
  const stored = {
    'source1': {
      aws_account_id: 'foo1',
      target_role_name: 'foo',
      role_name: 'bar',
    },
    'source2': {
      aws_account_id: 'foo2',
      source_profile: 'source1'
    }
  } as StoredConfig;
  const targetRoleName = getTargetRoleName(stored, 'source2');
  expect(targetRoleName).toMatchInlineSnapshot(`"foo"`);
});

it('should get targetRoleName from source2', () => {
  const stored = {
    'source1': {
      aws_account_id: 'foo1',
      target_role_name: 'foo',
      role_name: 'bar',
    },
    'source2': {
      aws_account_id: 'foo2',
      target_role_name: 'bar',
      source_profile: 'source1'
    }
  } as StoredConfig;
  const targetRoleName = getTargetRoleName(stored, 'source2');
  expect(targetRoleName).toMatchInlineSnapshot(`"bar"`);
});

it('should get accountId from source1', () => {
  const stored = {
    'source1': {
      aws_account_id: 'foo1',
      role_name: 'bar',
    },
    'source2': {
      source_profile: 'source1'
    },
  } as StoredConfig;
  const accountId = getSourceAccountId(stored, 'source2');
  expect(accountId).toMatchInlineSnapshot(`"foo1"`);
});

it('should get accountId from source2', () => {
  const stored = {
    'source1': {
      aws_account_id: 'foo1',
      role_name: 'bar',
    },
    'source2': {
      aws_account_id: 'foo2',
      source_profile: 'source1'
    },
  } as StoredConfig;
  const accountId = getSourceAccountId(stored, 'source2');
  expect(accountId).toMatchInlineSnapshot(`"foo1"`);
});

it('should get accountId from source1 when source2 has none', () => {
  const stored = {
    'source1': {
      role_name: 'bar',
    },
    'source2': {
      aws_account_id: 'foo2',
      source_profile: 'source1'
    },
  } as StoredConfig;
  const accountId = getSourceAccountId(stored, 'source2');
  expect(accountId).toMatchInlineSnapshot(`"foo2"`);
});

it('should get accountId from source1 when source2 has none', () => {
  const stored = {
    'source1': {
      role_name: 'bar',
    },
    'source2': {
      source_profile: 'source1'
    },
  } as StoredConfig;
  const accountId = getSourceAccountId(stored, 'source2');
  expect(accountId).toMatchInlineSnapshot(`undefined`);
});
