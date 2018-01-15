<?php
return array(
	//'配置项'=>'配置值'
	
// +----------------------------------------------------------------------
// | 数据库配置设定
// +----------------------------------------------------------------------		
	'DB_TYPE'               =>  'mysql',        // 数据库类型
    'DB_PORT'               =>  '3306',        // 端口
    'DB_PREFIX'             =>  'lr_',       // 数据库表前缀   ！开发时配置常量 ！
    'DB_CHARSET'            =>  'utf8',      // 数据库编码默认采用utf8		
// +----------------------------------------------------------------------
// | 弹性WEB服务器和数据库
// +----------------------------------------------------------------------
//  'DB_HOST'               =>  'rm-bp12j54a6nuw04l8t.mysql.rds.aliyuncs.com', // 服务器地址
//  'DB_NAME'               =>  'r6hpk2l184',          // 数据库名
//  'DB_USER'               =>  'r6hpk2l184',      // 用户名
//  'DB_PWD'                =>  'leren888_win',//'1234QWERasdf',          // 密码
// +----------------------------------------------------------------------
// | 本地测试服务器和数据库
// +----------------------------------------------------------------------  	 
	'DB_HOST'               =>  '127.0.0.1', // 服务器地址
    'DB_NAME'               =>  'minihezhouxiuxiansz',          // 数据库名
    'DB_USER'               =>  'leren',      // 用户名
    'DB_PWD'                =>  'HUBEIleren0418*',      //'1234QWERasdf',          // 密码
    'content'=>array(
        'dir' =>"/minihezhouxiuxiansz/Data/"
    ),
    'wxpay'  =>array(
        'applyshop_notify_url'=>"https://gzleren.com/minihezhouxiuxiansz/index.php/Api/Applyshop/wxnotifyurl",
        'wx_notify_url'       =>"https://gzleren.com/minihezhouxiuxiansz/index.php/Api/Pay/wxnotifyurl",
        'wx_rznotify_url'       =>"https://gzleren.com/minihezhouxiuxiansz/index.php/Api/Renzheng/wxrznotifyurl"
    ),
    'weixin' => array(
        'appid'  => 'wx2ba518f4bb9fccc0', 
        'secret' => 'd65af36e27210b63d2008aa330a902d8',
        'key'    => 'XIWmy5UAs37TeNquZOAtjollVK9yJFaX',
        'mchid'  => '1474898802'
    ),

    'zhifubao' => array(
        'appid' => '2018010901711079',
        'rsaPrivateKey' => 'MIIEpAIBAAKCAQEAuEQJiVnG6sOXW7mYZnPFJ2jGc6PewO4x84HJkAWawLQxa861Wo5PgyeqH3/Qt3MTZVX9Cb6oBU0mJXwnasrbhOIMcrJPrh3lxeJLlfdioDYQyIxbYh17Qkku8Oty7xDqU+UhEAL2BGV20ydTiLZLqkRuU3QOgw4YLNbp2zXtQTd5AV5GVGDS+V0hcP23xDMGm99kP2kSyWe/nef2NtgwPVRjyzTG70cYMPExuSasQRKZvmnkGyJ2rX8opU0w2bFe7nqE4cRZ4LCFAyTQ2EmwX0v8/qEPHmv1K8pRkQ74QIS5VNn0lZISKM9+c0/pFA2H88sn4q8Yy8z+oAMEmd5yPwIDAQABAoIBAGkz5yH1EN2uR/dFkl5EELb8WfliAOaz1+8IFbVVjdIhzumXPfFyuLDP75BGYDqsx9Eec/ahVLqaHoJeTP7qzMQkbyj45wco6Ku/FJqNgFCqLZDimbX90Qa6U8OXGaqmRLMbaXIDzsQZzeqmVEoEklSm9zpMU5C9dk37cc8HDesiMPk9zdqmzz/eNn0MXSKYUiWjVXEAr3lZHiKzjERVARXQ5Tbd3c7XVX0gOe9DZ0d+fIC5BQ1QojFXtK689oSFPR7XbSWmAS/gOTWnJWLXeI/c4wf9orrzvJeoKoP/WJF5S7rXZWLRvWGBTzf5BOTMxxYysw6VztEpiKJc23x+CHECgYEA6ySeEZCvPNOQUzs/cEhTvfGUO6vfWDylp/+nNuAB6TO0SkBjrM3tFKg43AApLo3H+HBoPnXuZXbdKkuPo4vmWX/k9oMIZywgp4yO9qCDliAGkvKWIzYzp+lGS0E3sQUfL/I0RwVWTKkGVBN3Aydvt+6y5ktAKY50hpHTkSzt9akCgYEAyJwm5ql8KpU6uv1QI3ZHgcRpjl3Qs8939vvmILuydvA3DOg0+yVOIlivh26OS1Fmh/DRQaglw66jiiVuLapuzYwqGUdgDM0BRHsv/cSbTCKmFvmA7lM4/vWfTUDkfGTkpHUbA3J6Q2FEQGcxmKW0DlsVhkuH/kq0imRlSISmSacCgYAtlMuPXBycDebMO4/wlBSnnUy+xHJnCFqUVlpzqLi2G++29QRdWw26E2HyQ5W4EIPTBPcwJGwx/vigWkVdzqC4eLJJltzqIwOxdu2/oR3g3BRqJ9wyty8MPYwCyoGhLvz8rlaz7bTs51bytVM8qUhev0aunaeyZorwCxSX772xAQKBgQDFthAo2PUEytp9G9b1fEbxP/CAXTmpXVnwU0b1D8fNrOW0lM5Sjuu4sgscwPsAhBM2+0JhISVG/EE1j7pMy2I0tmVvUIb7VrhfE8GyqygbGzLyBajqOZ88uDruWnxVlOI6qyeaeCLDcYNgrdOVjAou89n850f6eQoCMvwXQpTYlQKBgQCJyIu1fqVmpo2lsyNSRJuxyrrt0IkMR5QO7YV69mHJwJxwF/AKPwdk4gbE/3ZBFIKFgMXbQHvGY67a0KB2Dqeg1P7yZ8zMRbfZkovBYzZhQ/EzBZrwqKOC7aDPAedcHUHBZXXxW9NTLlAMK3axE8PoFFYKEusIy0jpDqj7aT0fZQ==',
        'alipayrsaPublicKey' => 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnb2c0n8UCYH633RWRcQ1eKJVla+tkwSRMg+hQQq/Y9fgmEBilODiinnrWXAGpB5Va/S+l0nbQUGLF2uANIklIZMDbaSXMYRQ+JgKnztmAl4CdSlUB1DXcYM9HZ5OvwJQ18rQGv4bJl3xMruQCk7VzACZmRCatU1KdcdR6OWMtX3NY8D1osuKCsCvYHjxajA41vpPCcOPdZeCkgBAcBRmVVuHm08he2TUleLOCXBqwlVu2ZKWVYUPsb3htKgX+bnuxdbcA0G65G3FoIIX2QtECWxwo6fv+Fl6iLrmVQSrZz5E3kW9xG4XrmCUiA4QMHOX3Q/wsVJnZ9ydbRikdPGsgwIDAQAB'
    ),	

);
