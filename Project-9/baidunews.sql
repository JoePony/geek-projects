-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2015-12-17 19:38:09
-- 服务器版本： 5.5.20-log
-- PHP Version: 5.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `baidunews`
--

-- --------------------------------------------------------

--
-- 表的结构 `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nameEN` varchar(250) NOT NULL,
  `nameCH` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`id`, `nameEN`, `nameCH`) VALUES
(1, 'recommand', '推荐'),
(2, 'baijia', '百家'),
(3, 'picture', '图片'),
(4, 'local', '本地'),
(5, 'society', '社会'),
(6, 'military', '军事'),
(7, 'tech', '科技'),
(8, 'culture', '文化'),
(9, 'internet', '互联网'),
(10, 'women', '女人'),
(11, 'intertainment', '娱乐');

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `category` varchar(100) NOT NULL,
  `imgPath` varchar(255) NOT NULL,
  `source` varchar(255) NOT NULL,
  `time` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=150 ;

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`id`, `title`, `content`, `category`, `imgPath`, `source`, `time`) VALUES
(94, '5恒大不是中国足球的遮羞布', '恒大不是中国足球的遮羞布，恒大不是中国足球的遮羞布。\n恒大不是中国足球的遮羞布恒大不是中国足球的遮羞布恒大不是中国足球的遮羞布恒大不是中国足球的遮羞布恒大不是中国足球的遮羞布', '百家', '/images/upload/2.jpg', '凤凰新闻', 1448689811),
(96, '6习近平谈国防和军队建设：改革是决定军队未来的关键一招', '习近平谈国防和军队建设：改革是决定军队未来的关键一招习近平谈国防和军队建设：改革是决定军队未来的关键一招习近平谈国防和军队建设：改革是决定军队未来的关键一招', '推荐', '/images/upload/1.jpg', '央视', 1448689549),
(97, '7雁荡山迎首列高铁旅游专列 比普通高铁省半个小时', '雁荡山迎首列高铁旅游专列 比普通高铁省半个小时，雁荡山迎首列高铁旅游专列 比普通高铁省半个小时雁荡山迎首列高铁旅游专列 比普通高铁省半个小时雁荡山迎首列高铁旅游专列 比普通高铁省半个小时雁荡山迎首列高铁旅游专列 比普通高铁省半个小时雁荡山迎首列高铁旅游专列 比普通高铁省半个小时', '推荐', '/images/upload/2.jpg', '', 1448595348),
(98, '4俄军方称土耳其F16战机在叙利亚领空逗留40秒', '俄军方称土耳其F16战机在叙利亚领空逗留40秒。\r\n俄军方称土耳其F16战机在叙利亚领空逗留40秒，俄军方称土耳其F16战机在叙利亚领空逗留40秒俄军方称土耳其F16战机在叙利亚领空逗留40秒俄军方称土耳其F16战机在叙利亚领空逗留40秒俄军方称土耳其F16战机在叙利亚领空逗留40秒', '推荐', '/images/upload/2.jpg', '', 1448692333),
(99, '3广州车牌摇号竞争激烈', '83抢1 广州车牌摇号竞争激烈83抢1 广州车牌摇号竞争激\r\n烈83抢1 广州车牌摇号竞争激烈', '推荐', '/images/upload/1.jpg', '', 1448692387),
(100, '2楼市去库存成地方政府重要政治任务 被指难以见效', '1楼市去库存成地方政府重要政治任务 被指难以见效楼市去库存成地方政府重要政治任务 被指难以见效。\r\n楼市去库存成地方政府重要政治任务 被指难以见效\r\n。楼市去库存成地方政府重要政治任务 被指难以见效', '推荐', '/images/upload/2.jpg', 'cri', 1448692483),
(101, '1离奇车祸:三行驶车辆腾空而起', '离奇车祸:三行驶车。辆腾空而\r\n起离奇车祸:三行驶。\r\n车辆腾空而起离奇车祸:三行驶车辆腾空而起离奇车祸:三行驶车辆腾空而起', '推荐', '/images/upload/3.jpg', '凤凰网', 1448692773),
(102, '美军地面部队进入叙利亚培训库尔德武装 ', '美军地面部队进入叙利亚培训库尔德武装 。\r\n美军地面部队进入叙利亚培训库尔德武装 。美军地面部队进入叙利亚培训库尔德武装 。\r\n美军地面部队进入叙利亚培训库尔德武装 ，美军地面部队进入叙利亚培训库尔德武装 。', '推荐', '/images/upload/3.jpg', '163新闻', 1448705625),
(103, '《消失的凶手》：悬疑烧脑，情感烧心。', '《消失的凶手》：悬疑烧脑，情感烧心。《消失的凶手》：悬疑烧脑，情感烧心。《消失的凶手》：悬疑烧脑，情感烧心。《消失的凶手》：悬疑烧脑，情感烧心。', '百家', '/images/upload/2.jpg', '百度百家', 1448705920),
(104, '新美大整合阵痛加剧 “金字塔”投资结构初现裂缝', '新美大整合阵痛加剧 “金字塔”投资结构初现裂缝新美大整合阵痛加剧 “金字塔”投资结构初现裂缝新美大整合阵痛加剧 “金字塔”投资结构初现裂缝', '百家', '/images/upload/3.jpg', '凤凰周刊', 1448705951),
(105, '北京西站临时候车区将搬进室内 商户已开始腾退', '北京西站临时候车区将搬进室内 商户已开始腾退北京西站临时候车区将搬进室内 商户已开始腾退北京西站临时候车区将搬进室内 商户已开始腾退北京西站临时候车区将搬进室内 商户已开始腾退北京西站临时候车区将搬进室内 商户已开始腾退北京西站临时候车区将搬进室内 商户已开始腾退', '本地', '', '', 1448763767),
(106, '卖鞋垫老太被网友爱心吓跑', '卖鞋垫老太被网友爱心吓跑卖鞋垫老太，\r\n被网友爱心吓跑卖鞋垫老太被网友爱心吓跑卖鞋垫老太被网友爱\r\n心吓跑卖鞋垫老太被网友爱心吓跑的', '图片', '/images/upload/2.jpg', '新华网', 1448763914),
(108, '欧洲难民危机或触发债务崩溃2', '发v欧洲难民危机或触发债务崩溃欧洲难民危机或触发债务崩溃', '推荐', '/images/upload/2.jpg', '', 1448764761),
(135, '姚劲波的囚徒困境：如何做好二手车业务的平衡术1', '对于姚劲波要在二手车市场通杀的做法，土妖虽然佩服其野心和勇气，但是同样是不看好。不仅如此，相反如果把已有的资源生生分拆到二手车市场的两个不同业态里，不仅无法圆满地跟用户、客户、合作伙伴、投资人讲一个动听的二手车故事，还可能因为自身的资源分散、左右互搏，最终鱼和熊掌皆没得到，甚至从根基上动摇58赶集如今尚不太稳的业务根基。', '本地', '/images/upload/2.jpg', '百度', 1450178190),
(136, '央视真人秀男嘉宾嘴对嘴喂包子 网友:好污(图)', '央视真人秀男嘉宾嘴对嘴喂包子 网友:好污(图)央视真人秀男嘉宾嘴对嘴喂包子 网友:好污(图)央视真人秀男嘉宾嘴对嘴喂包子 网友:好污(图)', '百家', 'http://images.haiwainet.cn/2015/1215/20151215012931968.png', '央视', 1450178999),
(137, '处女座：给你一个小房子呀~怎么样喜欢吧！', '处女座：给你一个小房子呀~怎么样喜欢吧！处女座：给你一个小房子呀~怎么样喜欢吧！处女座：给你一个小房子呀~怎么样喜欢吧！', '百家', '/images/upload/1450351638_1432688587323K7VNAH6S3.jpg', '新浪', 1450179236),
(138, '多家投行预计iPhone销量已达顶峰 明年将下滑', '多家投行预计iPhone销量已达顶峰 明年将下滑多家投行预计iPhone销量已达顶峰 明年将下滑多家投行预计iPhone销量已达顶峰 明年将下滑', '百家', 'http://n.sinaimg.cn/tech/transform/20151215/2nUy-fxmpnqi6540609.jpg', '', 1450179513),
(139, '意大利渔民钓起121公斤巨型鲶鱼   大嘴似水怪', '意大利渔民钓起121公斤巨型鲶鱼：大嘴似水怪意大利渔民钓起121公斤巨型鲶鱼：大嘴似水怪', '推荐', 'http://www.sinaimg.cn/dy/slidenews/5_img/2015_51/453_73180_311899.gif', '', 1450179609),
(147, '习近平-维护网络安全不应双重标准', '习近平:维护网络安全不应双重标准习近平:维护网络安全不应双重标准习近平:维护网络安全不应双重标准\r\n习近平:维护网络安全不应双重标准习近平:维护网络安全不应双重标准习近平:维护网络安全不应双重标准习近平:维护网络安全不应双重标准', '推荐', '/images/upload/1450347614_W020151217283392732657.jpeg', '百度', 1450347614),
(149, 'jkj1', 'l;l;', '军事', '/images/upload/1450351547_W020151217283392732657.jpeg', '', 1450351547);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin123');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
