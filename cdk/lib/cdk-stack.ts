import * as cdk from "aws-cdk-lib";
import { StaticSite } from "../static-site";

export class MyStaticSiteStack extends cdk.Stack {
	constructor(parent: cdk.App, name: string) {
		super(parent, name);

		new StaticSite(this, "JSStaticWebsite");
	}
}
