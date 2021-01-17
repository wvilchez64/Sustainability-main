USE [Sustainability]
GO
ALTER TABLE [dbo].[userGoal] DROP CONSTRAINT [FK_userGoal_userId]
GO
ALTER TABLE [dbo].[userGoal] DROP CONSTRAINT [FK_userGoal_goalId]
GO
ALTER TABLE [dbo].[userGoal] DROP CONSTRAINT [FK_userGoal_campaignId]
GO
ALTER TABLE [dbo].[userCampaign] DROP CONSTRAINT [FK_userCampaign_userId]
GO
ALTER TABLE [dbo].[userCampaign] DROP CONSTRAINT [FK_userCampaign_campaignId]
GO
ALTER TABLE [dbo].[uploadFile] DROP CONSTRAINT [FK_uploadFile_userId]
GO
ALTER TABLE [dbo].[goal] DROP CONSTRAINT [FK_goal_campaignId]
GO
ALTER TABLE [dbo].[userGoal] DROP CONSTRAINT [DF_userGoal_inactiveInd]
GO
ALTER TABLE [dbo].[userGoal] DROP CONSTRAINT [DF_userGoal_dateCreated]
GO
ALTER TABLE [dbo].[userCampaign] DROP CONSTRAINT [DF_userCampaign_inactiveInd]
GO
ALTER TABLE [dbo].[userCampaign] DROP CONSTRAINT [DF_userCampaign_dateCreated]
GO
ALTER TABLE [dbo].[user] DROP CONSTRAINT [DF_user_inactiveInd]
GO
ALTER TABLE [dbo].[user] DROP CONSTRAINT [DF_user_dateCreated]
GO
ALTER TABLE [dbo].[user] DROP CONSTRAINT [DF_user_resetKeySent]
GO
ALTER TABLE [dbo].[uploadFile] DROP CONSTRAINT [DF_uploadFile_inactiveInd]
GO
ALTER TABLE [dbo].[uploadFile] DROP CONSTRAINT [DF_uploadFile_dateCreated]
GO
ALTER TABLE [dbo].[goal] DROP CONSTRAINT [DF_goal_inactiveInd]
GO
ALTER TABLE [dbo].[goal] DROP CONSTRAINT [DF_goal_dateCreated]
GO
ALTER TABLE [dbo].[campaign] DROP CONSTRAINT [DF_campaign_inactiveInd]
GO
ALTER TABLE [dbo].[campaign] DROP CONSTRAINT [DF_campaign_dateCreated]
GO
/****** Object:  Index [ndx2_userGoal]    Script Date: 10/26/2020 7:24:14 PM ******/
DROP INDEX [ndx2_userGoal] ON [dbo].[userGoal]
GO
/****** Object:  Index [ndx1_userGoal]    Script Date: 10/26/2020 7:24:14 PM ******/
DROP INDEX [ndx1_userGoal] ON [dbo].[userGoal]
GO
/****** Object:  Index [ndx_userGoal]    Script Date: 10/26/2020 7:24:14 PM ******/
DROP INDEX [ndx_userGoal] ON [dbo].[userGoal]
GO
/****** Object:  Index [ndx1_userCampaign]    Script Date: 10/26/2020 7:24:14 PM ******/
DROP INDEX [ndx1_userCampaign] ON [dbo].[userCampaign]
GO
/****** Object:  Index [ndx_userCampaign]    Script Date: 10/26/2020 7:24:14 PM ******/
DROP INDEX [ndx_userCampaign] ON [dbo].[userCampaign]
GO
/****** Object:  Index [ndx_user3]    Script Date: 10/26/2020 7:24:14 PM ******/
DROP INDEX [ndx_user3] ON [dbo].[user]
GO
/****** Object:  Index [ndx_user2]    Script Date: 10/26/2020 7:24:14 PM ******/
DROP INDEX [ndx_user2] ON [dbo].[user]
GO
/****** Object:  Index [ndx_user1]    Script Date: 10/26/2020 7:24:14 PM ******/
DROP INDEX [ndx_user1] ON [dbo].[user]
GO
/****** Object:  Index [ndx_user]    Script Date: 10/26/2020 7:24:14 PM ******/
DROP INDEX [ndx_user] ON [dbo].[user]
GO
/****** Object:  Index [ndx_uploadFile]    Script Date: 10/26/2020 7:24:14 PM ******/
DROP INDEX [ndx_uploadFile] ON [dbo].[uploadFile]
GO
/****** Object:  Index [ndx3_goal]    Script Date: 10/26/2020 7:24:14 PM ******/
DROP INDEX [ndx3_goal] ON [dbo].[goal]
GO
/****** Object:  Index [ndx2_goal]    Script Date: 10/26/2020 7:24:14 PM ******/
DROP INDEX [ndx2_goal] ON [dbo].[goal]
GO
/****** Object:  Index [ndx1_goal]    Script Date: 10/26/2020 7:24:14 PM ******/
DROP INDEX [ndx1_goal] ON [dbo].[goal]
GO
/****** Object:  Index [ndx_goal]    Script Date: 10/26/2020 7:24:14 PM ******/
DROP INDEX [ndx_goal] ON [dbo].[goal]
GO
/****** Object:  Index [ndx_campaign]    Script Date: 10/26/2020 7:24:14 PM ******/
DROP INDEX [ndx_campaign] ON [dbo].[campaign]
GO
/****** Object:  Table [dbo].[userGoal]    Script Date: 10/26/2020 7:24:14 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[userGoal]') AND type in (N'U'))
DROP TABLE [dbo].[userGoal]
GO
/****** Object:  Table [dbo].[userCampaign]    Script Date: 10/26/2020 7:24:14 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[userCampaign]') AND type in (N'U'))
DROP TABLE [dbo].[userCampaign]
GO
/****** Object:  Table [dbo].[user]    Script Date: 10/26/2020 7:24:14 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[user]') AND type in (N'U'))
DROP TABLE [dbo].[user]
GO
/****** Object:  Table [dbo].[uploadFile]    Script Date: 10/26/2020 7:24:14 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[uploadFile]') AND type in (N'U'))
DROP TABLE [dbo].[uploadFile]
GO
/****** Object:  Table [dbo].[goal]    Script Date: 10/26/2020 7:24:14 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[goal]') AND type in (N'U'))
DROP TABLE [dbo].[goal]
GO
/****** Object:  Table [dbo].[campaign]    Script Date: 10/26/2020 7:24:14 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[campaign]') AND type in (N'U'))
DROP TABLE [dbo].[campaign]
GO
/****** Object:  Table [dbo].[campaign]    Script Date: 10/26/2020 7:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[campaign](
	[id] [int] IDENTITY(0,1) NOT NULL,
	[name] [varchar](100) NOT NULL,
	[urlLogo] [varchar](255) NOT NULL,
	[urlDetail] [varchar](255) NOT NULL,
	[dateCreated] [datetime] NOT NULL,
	[inactiveInd] [bit] NOT NULL,
 CONSTRAINT [PK_campaign] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[goal]    Script Date: 10/26/2020 7:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[goal](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[campaignId] [int] NOT NULL,
	[code] [int] NOT NULL,
	[name] [varchar](255) NOT NULL,
	[shortName] [varchar](50) NOT NULL,
	[urlLogo] [varchar](255) NOT NULL,
	[urlDetail] [varchar](255) NOT NULL,
	[dateCreated] [datetime] NOT NULL,
	[inactiveInd] [bit] NOT NULL,
 CONSTRAINT [PK_goal] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[uploadFile]    Script Date: 10/26/2020 7:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[uploadFile](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [int] NOT NULL,
	[directory] [varchar](20) NOT NULL,
	[fileName] [varchar](100) NOT NULL,
	[description] [varchar](100) NOT NULL,
	[linkfile] [varchar](100) NOT NULL,
	[dateCreated] [datetime] NOT NULL,
	[inactiveInd] [bit] NOT NULL,
 CONSTRAINT [PK_uploadFile] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user]    Script Date: 10/26/2020 7:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[fullName] [varchar](128) NOT NULL,
	[userName] [varchar](128) NOT NULL,
	[email] [varchar](128) NOT NULL,
	[providerType] [varchar](15) NOT NULL,
	[password] [varchar](32) NOT NULL,
	[resetKeySent] [datetime] NULL,
	[dateCreated] [datetime] NOT NULL,
	[inactiveInd] [bit] NOT NULL,
 CONSTRAINT [PK_user] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[userCampaign]    Script Date: 10/26/2020 7:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[userCampaign](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userid] [int] NOT NULL,
	[campaignId] [int] NOT NULL,
	[dateCreated] [datetime] NOT NULL,
	[inactiveInd] [bit] NOT NULL,
 CONSTRAINT [PK_userCampaign] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[userGoal]    Script Date: 10/26/2020 7:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[userGoal](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userid] [int] NOT NULL,
	[campaignId] [int] NOT NULL,
	[goalId] [int] NOT NULL,
	[percentageOfCompletion] [decimal](5, 2) NOT NULL,
	[notes] [text] NULL,
	[dateCreated] [datetime] NOT NULL,
	[inactiveInd] [bit] NOT NULL,
 CONSTRAINT [PK_userGoal] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[campaign] ON 
GO
INSERT [dbo].[campaign] ([id], [name], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (0, N'Demo Trial', N'https://www.demo.png', N'https://www.demo/', CAST(N'2020-09-24T14:36:44.760' AS DateTime), 0)
GO
INSERT [dbo].[campaign] ([id], [name], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (1, N'United Nations - Sustainable Development', N'https://www.un.org/sustainabledevelopment/wp-content/uploads/2020/05/SDG_website_E_v3_200px.png', N'https://www.un.org/sustainabledevelopment/', CAST(N'2020-09-24T14:36:44.760' AS DateTime), 0)
GO
SET IDENTITY_INSERT [dbo].[campaign] OFF
GO
SET IDENTITY_INSERT [dbo].[goal] ON 
GO
INSERT [dbo].[goal] ([id], [campaignId], [code], [name], [shortName], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (1, 1, 1, N'End poverty in all its forms everywhere', N'No Poverty', N'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-01.jpg', N'https://www.un.org/sustainabledevelopment/poverty/', CAST(N'2020-09-24T15:03:31.783' AS DateTime), 0)
GO
INSERT [dbo].[goal] ([id], [campaignId], [code], [name], [shortName], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (2, 1, 2, N'Zero Hunger', N'Zero Hunger', N'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-02.jpg', N'https://www.un.org/sustainabledevelopment/hunger/', CAST(N'2020-09-24T15:03:31.827' AS DateTime), 0)
GO
INSERT [dbo].[goal] ([id], [campaignId], [code], [name], [shortName], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (3, 1, 3, N'Ensure healthy lives and promote well-being for all at all ages', N'Good Health and Well-Being', N'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-03.jpg', N'https://www.un.org/sustainabledevelopment/health/', CAST(N'2020-09-24T15:03:31.840' AS DateTime), 0)
GO
INSERT [dbo].[goal] ([id], [campaignId], [code], [name], [shortName], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (4, 1, 4, N'Quality Education', N'Quality Education', N'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-04.jpg', N'https://www.un.org/sustainabledevelopment/education/', CAST(N'2020-09-24T15:03:31.863' AS DateTime), 0)
GO
INSERT [dbo].[goal] ([id], [campaignId], [code], [name], [shortName], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (5, 1, 5, N'Achieve gender equality and empower all women and girls', N'Gender Equality', N'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-05.jpg', N'https://www.un.org/sustainabledevelopment/gender-equality/', CAST(N'2020-09-24T15:03:31.887' AS DateTime), 0)
GO
INSERT [dbo].[goal] ([id], [campaignId], [code], [name], [shortName], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (6, 1, 6, N'Ensure access to water and sanitation for all', N'Clean Water and Sanitation', N'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-06.jpg', N'https://www.un.org/sustainabledevelopment/water-and-sanitation/', CAST(N'2020-09-24T15:03:31.893' AS DateTime), 0)
GO
INSERT [dbo].[goal] ([id], [campaignId], [code], [name], [shortName], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (7, 1, 7, N'Ensure access to affordable, reliable, sustainable and modern energy', N'Affordable and Clean Energy', N'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-07.jpg', N'https://www.un.org/sustainabledevelopment/energy/', CAST(N'2020-09-24T15:03:31.900' AS DateTime), 0)
GO
INSERT [dbo].[goal] ([id], [campaignId], [code], [name], [shortName], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (8, 1, 8, N'Promote inclusive and sustainable economic growth, employment and decent work for all', N'Decent Work and Economic Growth', N'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-08.jpg', N'https://www.un.org/sustainabledevelopment/economic-growth/', CAST(N'2020-09-24T15:03:31.900' AS DateTime), 0)
GO
INSERT [dbo].[goal] ([id], [campaignId], [code], [name], [shortName], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (9, 1, 9, N'Build resilient infrastructure, promote sustainable industrialization and foster innovation', N'Industry, innovation and Infrastructure', N'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-09.jpg', N'https://www.un.org/sustainabledevelopment/infrastructure-industrialization/', CAST(N'2020-09-24T15:03:31.903' AS DateTime), 0)
GO
INSERT [dbo].[goal] ([id], [campaignId], [code], [name], [shortName], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (10, 1, 10, N'Reduce inequality within and among countries', N'Reduced Inequalities', N'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-10.jpg', N'https://www.un.org/sustainabledevelopment/inequality/', CAST(N'2020-09-24T15:03:31.910' AS DateTime), 0)
GO
INSERT [dbo].[goal] ([id], [campaignId], [code], [name], [shortName], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (11, 1, 11, N'Make cities inclusive, safe, resilient and sustainable', N'Sustainable Cities and Communities', N'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-11.jpg', N'https://www.un.org/sustainabledevelopment/cities/', CAST(N'2020-09-24T15:03:31.913' AS DateTime), 0)
GO
INSERT [dbo].[goal] ([id], [campaignId], [code], [name], [shortName], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (12, 1, 12, N'Ensure sustainable consumption and production patterns', N'Responsible Consumption and Production', N'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-12.jpg', N'https://www.un.org/sustainabledevelopment/sustainable-consumption-production/', CAST(N'2020-09-24T15:03:31.917' AS DateTime), 0)
GO
INSERT [dbo].[goal] ([id], [campaignId], [code], [name], [shortName], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (13, 1, 13, N'Take urgent action to combat climate change and its impacts', N'Climate Action', N'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-13.jpg', N'https://www.un.org/sustainabledevelopment/climate-change/', CAST(N'2020-09-24T15:03:31.920' AS DateTime), 0)
GO
INSERT [dbo].[goal] ([id], [campaignId], [code], [name], [shortName], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (14, 1, 14, N'Conserve and sustainably use the oceans, seas and marine resources', N'Life Below Water', N'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-14.jpg', N'https://www.un.org/sustainabledevelopment/oceans/', CAST(N'2020-09-24T15:03:31.933' AS DateTime), 0)
GO
INSERT [dbo].[goal] ([id], [campaignId], [code], [name], [shortName], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (15, 1, 15, N'Sustainably manage forests, combat desertification, halt and reverse land degradation, halt biodiversity loss', N'Life on Land', N'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-15.jpg', N'https://www.un.org/sustainabledevelopment/biodiversity/', CAST(N'2020-09-24T15:03:31.933' AS DateTime), 0)
GO
INSERT [dbo].[goal] ([id], [campaignId], [code], [name], [shortName], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (16, 1, 16, N'Promote just, peaceful and inclusive societies', N'Peace, Justice and Strong Institutions', N'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-16.jpg', N'https://www.un.org/sustainabledevelopment/peace-justice/', CAST(N'2020-09-24T15:03:31.937' AS DateTime), 0)
GO
INSERT [dbo].[goal] ([id], [campaignId], [code], [name], [shortName], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (17, 1, 17, N'Revitalize the global partnership for sustainable development', N'Partnerships for the Goals', N'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-17.jpg', N'https://www.un.org/sustainabledevelopment/globalpartnerships/', CAST(N'2020-09-24T15:03:31.937' AS DateTime), 0)
GO
INSERT [dbo].[goal] ([id], [campaignId], [code], [name], [shortName], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (18, 0, 1, N'Goal Demo 1', N'Demo 1', N'https://img.icons8.com/material-rounded/24/000000/forward-arrow.png', N'https://swcscorp.com/en/', CAST(N'2020-10-04T21:05:09.083' AS DateTime), 0)
GO
INSERT [dbo].[goal] ([id], [campaignId], [code], [name], [shortName], [urlLogo], [urlDetail], [dateCreated], [inactiveInd]) VALUES (19, 0, 2, N'Goal Demo 2', N'Demo 2', N'https://img.icons8.com/material-rounded/24/000000/reply-arrow.png', N'https://swcscorp.com/pt-pt/customer-business-solutions/', CAST(N'2020-10-05T08:08:30.193' AS DateTime), 0)
GO
SET IDENTITY_INSERT [dbo].[goal] OFF
GO
SET IDENTITY_INSERT [dbo].[uploadFile] ON 
GO
INSERT [dbo].[uploadFile] ([id], [userId], [directory], [fileName], [description], [linkfile], [dateCreated], [inactiveInd]) VALUES (1, 1, N'main', N'currículo-sem-título.txt', N'William', N'1603521332519.txt', CAST(N'2020-10-24T07:35:32.610' AS DateTime), 0)
GO
INSERT [dbo].[uploadFile] ([id], [userId], [directory], [fileName], [description], [linkfile], [dateCreated], [inactiveInd]) VALUES (2, 1, N'main', N'sustainable.png', N'William', N'1603521332514.png', CAST(N'2020-10-24T07:35:32.787' AS DateTime), 0)
GO
INSERT [dbo].[uploadFile] ([id], [userId], [directory], [fileName], [description], [linkfile], [dateCreated], [inactiveInd]) VALUES (3, 1, N'main', N'5381338771295292904.doc', N'William', N'1603521332504.doc', CAST(N'2020-10-24T07:35:32.793' AS DateTime), 0)
GO
INSERT [dbo].[uploadFile] ([id], [userId], [directory], [fileName], [description], [linkfile], [dateCreated], [inactiveInd]) VALUES (4, 1, N'main', N'William Vilchez Resume 2020.pdf', N'William', N'1603521332445.pdf', CAST(N'2020-10-24T07:35:32.797' AS DateTime), 0)
GO
INSERT [dbo].[uploadFile] ([id], [userId], [directory], [fileName], [description], [linkfile], [dateCreated], [inactiveInd]) VALUES (5, 1, N'main', N'les-corpographes-fi6I4FUqxVA-unsplash.jpg', N'William', N'1603521332498.jpg', CAST(N'2020-10-24T07:35:32.800' AS DateTime), 0)
GO
INSERT [dbo].[uploadFile] ([id], [userId], [directory], [fileName], [description], [linkfile], [dateCreated], [inactiveInd]) VALUES (6, 1, N'main', N'Test.txt', N'11111111111', N'1603521699695.txt', CAST(N'2020-10-24T07:41:39.730' AS DateTime), 0)
GO
INSERT [dbo].[uploadFile] ([id], [userId], [directory], [fileName], [description], [linkfile], [dateCreated], [inactiveInd]) VALUES (7, 1, N'main', N'currículo-sem-título.txt', N'last test', N'1603552691298.txt', CAST(N'2020-10-24T16:18:11.447' AS DateTime), 0)
GO
INSERT [dbo].[uploadFile] ([id], [userId], [directory], [fileName], [description], [linkfile], [dateCreated], [inactiveInd]) VALUES (8, 1, N'main', N'les-corpographes-fi6I4FUqxVA-unsplash.jpg', N'last test', N'1603552691261.jpg', CAST(N'2020-10-24T16:18:11.450' AS DateTime), 0)
GO
INSERT [dbo].[uploadFile] ([id], [userId], [directory], [fileName], [description], [linkfile], [dateCreated], [inactiveInd]) VALUES (9, 1, N'main', N'William Vilchez Resume 2020.pdf', N'last test', N'1603552691256.pdf', CAST(N'2020-10-24T16:18:11.450' AS DateTime), 0)
GO
INSERT [dbo].[uploadFile] ([id], [userId], [directory], [fileName], [description], [linkfile], [dateCreated], [inactiveInd]) VALUES (10, 1, N'main', N'sustainable.png', N'last test', N'1603552691266.png', CAST(N'2020-10-24T16:18:11.450' AS DateTime), 0)
GO
INSERT [dbo].[uploadFile] ([id], [userId], [directory], [fileName], [description], [linkfile], [dateCreated], [inactiveInd]) VALUES (11, 1, N'main', N'5381338771295292904.doc', N'last test', N'1603552691280.doc', CAST(N'2020-10-24T16:18:11.680' AS DateTime), 0)
GO
SET IDENTITY_INSERT [dbo].[uploadFile] OFF
GO
SET IDENTITY_INSERT [dbo].[user] ON 
GO
INSERT [dbo].[user] ([id], [fullName], [userName], [email], [providerType], [password], [resetKeySent], [dateCreated], [inactiveInd]) VALUES (1, N'William Vilchez Valero', N'wvilchez64', N'wvilchez64@hotmail.com', N'local', N'f3b715240e3c5081fe908acf4bfd4790', 1, CAST(N'2020-10-23T09:53:17.887' AS DateTime), 0)
GO
SET IDENTITY_INSERT [dbo].[user] OFF
GO
SET IDENTITY_INSERT [dbo].[userCampaign] ON 
GO
INSERT [dbo].[userCampaign] ([id], [userid], [campaignId], [dateCreated], [inactiveInd]) VALUES (1, 1, 0, CAST(N'2020-10-23T09:53:17.887' AS DateTime), 0)
GO
SET IDENTITY_INSERT [dbo].[userCampaign] OFF
GO
SET IDENTITY_INSERT [dbo].[userGoal] ON 
GO
INSERT [dbo].[userGoal] ([id], [userid], [campaignId], [goalId], [percentageOfCompletion], [notes], [dateCreated], [inactiveInd]) VALUES (1, 1, 0, 18, CAST(0.00 AS Decimal(5, 2)), N'', CAST(N'2020-10-23T09:53:17.890' AS DateTime), 0)
GO
INSERT [dbo].[userGoal] ([id], [userid], [campaignId], [goalId], [percentageOfCompletion], [notes], [dateCreated], [inactiveInd]) VALUES (2, 1, 0, 19, CAST(0.00 AS Decimal(5, 2)), N'', CAST(N'2020-10-23T09:53:17.890' AS DateTime), 0)
GO
SET IDENTITY_INSERT [dbo].[userGoal] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [ndx_campaign]    Script Date: 10/26/2020 7:24:14 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [ndx_campaign] ON [dbo].[campaign]
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ndx_goal]    Script Date: 10/26/2020 7:24:14 PM ******/
CREATE NONCLUSTERED INDEX [ndx_goal] ON [dbo].[goal]
(
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ndx1_goal]    Script Date: 10/26/2020 7:24:14 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [ndx1_goal] ON [dbo].[goal]
(
	[campaignId] ASC,
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [ndx2_goal]    Script Date: 10/26/2020 7:24:14 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [ndx2_goal] ON [dbo].[goal]
(
	[name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [ndx3_goal]    Script Date: 10/26/2020 7:24:14 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [ndx3_goal] ON [dbo].[goal]
(
	[shortName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [ndx_uploadFile]    Script Date: 10/26/2020 7:24:14 PM ******/
CREATE NONCLUSTERED INDEX [ndx_uploadFile] ON [dbo].[uploadFile]
(
	[userId] ASC,
	[directory] ASC,
	[dateCreated] DESC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [ndx_user]    Script Date: 10/26/2020 7:24:14 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [ndx_user] ON [dbo].[user]
(
	[email] ASC
)
WHERE ([providerType]='local' AND [inactiveInd]=(0))
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [ndx_user1]    Script Date: 10/26/2020 7:24:14 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [ndx_user1] ON [dbo].[user]
(
	[userName] ASC
)
WHERE ([providerType]='local' AND [inactiveInd]=(0))
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [ndx_user2]    Script Date: 10/26/2020 7:24:14 PM ******/
CREATE NONCLUSTERED INDEX [ndx_user2] ON [dbo].[user]
(
	[email] ASC,
	[providerType] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [ndx_user3]    Script Date: 10/26/2020 7:24:14 PM ******/
CREATE NONCLUSTERED INDEX [ndx_user3] ON [dbo].[user]
(
	[userName] ASC,
	[providerType] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ndx_userCampaign]    Script Date: 10/26/2020 7:24:14 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [ndx_userCampaign] ON [dbo].[userCampaign]
(
	[userid] ASC,
	[campaignId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ndx1_userCampaign]    Script Date: 10/26/2020 7:24:14 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [ndx1_userCampaign] ON [dbo].[userCampaign]
(
	[campaignId] ASC,
	[userid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ndx_userGoal]    Script Date: 10/26/2020 7:24:14 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [ndx_userGoal] ON [dbo].[userGoal]
(
	[userid] ASC,
	[campaignId] ASC,
	[goalId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ndx1_userGoal]    Script Date: 10/26/2020 7:24:14 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [ndx1_userGoal] ON [dbo].[userGoal]
(
	[campaignId] ASC,
	[goalId] ASC,
	[userid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [ndx2_userGoal]    Script Date: 10/26/2020 7:24:14 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [ndx2_userGoal] ON [dbo].[userGoal]
(
	[goalId] ASC,
	[userid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[campaign] ADD  CONSTRAINT [DF_campaign_dateCreated]  DEFAULT (getdate()) FOR [dateCreated]
GO
ALTER TABLE [dbo].[campaign] ADD  CONSTRAINT [DF_campaign_inactiveInd]  DEFAULT ((0)) FOR [inactiveInd]
GO
ALTER TABLE [dbo].[goal] ADD  CONSTRAINT [DF_goal_dateCreated]  DEFAULT (getdate()) FOR [dateCreated]
GO
ALTER TABLE [dbo].[goal] ADD  CONSTRAINT [DF_goal_inactiveInd]  DEFAULT ((0)) FOR [inactiveInd]
GO
ALTER TABLE [dbo].[uploadFile] ADD  CONSTRAINT [DF_uploadFile_dateCreated]  DEFAULT (getdate()) FOR [dateCreated]
GO
ALTER TABLE [dbo].[uploadFile] ADD  CONSTRAINT [DF_uploadFile_inactiveInd]  DEFAULT ((0)) FOR [inactiveInd]
GO
ALTER TABLE [dbo].[user] ADD  CONSTRAINT [DF_user_dateCreated]  DEFAULT (getdate()) FOR [dateCreated]
GO
ALTER TABLE [dbo].[user] ADD  CONSTRAINT [DF_user_inactiveInd]  DEFAULT ((0)) FOR [inactiveInd]
GO
ALTER TABLE [dbo].[userCampaign] ADD  CONSTRAINT [DF_userCampaign_dateCreated]  DEFAULT (getdate()) FOR [dateCreated]
GO
ALTER TABLE [dbo].[userCampaign] ADD  CONSTRAINT [DF_userCampaign_inactiveInd]  DEFAULT ((0)) FOR [inactiveInd]
GO
ALTER TABLE [dbo].[userGoal] ADD  CONSTRAINT [DF_userGoal_dateCreated]  DEFAULT (getdate()) FOR [dateCreated]
GO
ALTER TABLE [dbo].[userGoal] ADD  CONSTRAINT [DF_userGoal_inactiveInd]  DEFAULT ((0)) FOR [inactiveInd]
GO
ALTER TABLE [dbo].[goal]  WITH CHECK ADD  CONSTRAINT [FK_goal_campaignId] FOREIGN KEY([campaignId])
REFERENCES [dbo].[campaign] ([id])
GO
ALTER TABLE [dbo].[goal] CHECK CONSTRAINT [FK_goal_campaignId]
GO
ALTER TABLE [dbo].[uploadFile]  WITH CHECK ADD  CONSTRAINT [FK_uploadFile_userId] FOREIGN KEY([userId])
REFERENCES [dbo].[user] ([id])
GO
ALTER TABLE [dbo].[uploadFile] CHECK CONSTRAINT [FK_uploadFile_userId]
GO
ALTER TABLE [dbo].[userCampaign]  WITH CHECK ADD  CONSTRAINT [FK_userCampaign_campaignId] FOREIGN KEY([campaignId])
REFERENCES [dbo].[campaign] ([id])
GO
ALTER TABLE [dbo].[userCampaign] CHECK CONSTRAINT [FK_userCampaign_campaignId]
GO
ALTER TABLE [dbo].[userCampaign]  WITH CHECK ADD  CONSTRAINT [FK_userCampaign_userId] FOREIGN KEY([userid])
REFERENCES [dbo].[user] ([id])
GO
ALTER TABLE [dbo].[userCampaign] CHECK CONSTRAINT [FK_userCampaign_userId]
GO
ALTER TABLE [dbo].[userGoal]  WITH CHECK ADD  CONSTRAINT [FK_userGoal_campaignId] FOREIGN KEY([campaignId])
REFERENCES [dbo].[campaign] ([id])
GO
ALTER TABLE [dbo].[userGoal] CHECK CONSTRAINT [FK_userGoal_campaignId]
GO
ALTER TABLE [dbo].[userGoal]  WITH CHECK ADD  CONSTRAINT [FK_userGoal_goalId] FOREIGN KEY([goalId])
REFERENCES [dbo].[goal] ([id])
GO
ALTER TABLE [dbo].[userGoal] CHECK CONSTRAINT [FK_userGoal_goalId]
GO
ALTER TABLE [dbo].[userGoal]  WITH CHECK ADD  CONSTRAINT [FK_userGoal_userId] FOREIGN KEY([userid])
REFERENCES [dbo].[user] ([id])
GO
ALTER TABLE [dbo].[userGoal] CHECK CONSTRAINT [FK_userGoal_userId]
GO
