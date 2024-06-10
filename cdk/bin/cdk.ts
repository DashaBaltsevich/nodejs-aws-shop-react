#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { MyStaticSiteStack } from "../lib/cdk-stack";

const app = new cdk.App();

new MyStaticSiteStack(app, "MyJSStaticWebsite");

app.synth();
