import * as cdk from "aws-cdk-lib"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment"
import * as cloudfront from "aws-cdk-lib/aws-cloudfront"
import * as iam from "aws-cdk-lib/aws-iam"
import { Construct } from "constructs"
import { Stack } from "aws-cdk-lib"

export class StaticSite extends Construct {
	constructor(parent: Stack, name: string) {
		super(parent, name)

		const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, "JS-OAI")

		const siteBucket = new s3.Bucket(this, "JSStaticBucket", {
			bucketName: "js-cloudfront-s3-bucket",
			websiteIndexDocument: "index.html",
			publicReadAccess: false,
			blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
		})

		siteBucket.addToResourcePolicy(
			new iam.PolicyStatement({
				actions: ["S3:GetObject"],
				resources: [siteBucket.arnForObjects("*")],
				principals: [
					new iam.CanonicalUserPrincipal(
						cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
					),
				],
			})
		)

		const distribution = new cloudfront.CloudFrontWebDistribution(
			this,
			"JSCC-distribution",
			{
				originConfigs: [
					{
						s3OriginSource: {
							s3BucketSource: siteBucket,
							originAccessIdentity: cloudfrontOAI,
						},
						behaviors: [
							{
								isDefaultBehavior: true,
							},
						],
					},
				],
			}
		)

		new s3deploy.BucketDeployment(this, "JS-Bucket-Deployment", {
			sources: [s3deploy.Source.asset("../dist")],
			destinationBucket: siteBucket,
			distribution,
			distributionPaths: ["/*"],
		})
	}
}
