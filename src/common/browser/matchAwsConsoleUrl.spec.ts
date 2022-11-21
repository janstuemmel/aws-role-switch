import matchAwsConsoleUrl from './matchAwsConsoleUrl';

test.each([
  [undefined, false],
  ['', false],
  ['https://console.aws.amazon.com/console/lambda', false],
  ['https://us-east-1.console.aws.amazon.com/console/lambda', true],
  ['https://us-east-1.console.aws.amazon.com/console/home?region=us-east-1', true],
  ['https://eu-central-1.console.aws.amazon.com/console/home?region=eu-central-1', true],
  ['https://phd.console.aws.amazon.com/console/home?region=eu-central-1', true],
  ['https://us-east-1.console.amazonaws-us-gov.com/console/home?region=ueu-central-1', true],
  ['https://us-east-1.console.amazonaws.cn/console/home', true],
])('test matchAwsConsoleUrl "%s"', (url, expected) => {
  expect(matchAwsConsoleUrl(url)).toEqual(expected);
});
