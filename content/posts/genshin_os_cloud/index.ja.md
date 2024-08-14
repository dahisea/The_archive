---
title: 「ユン・ユアンシェン国際版サーバー」
date: 2024-08-10T01:25:04Z
draft: false
description: 「」
tags: "原神"

---
海外版は遅延が大きくてアクセスできない？

API `https://sg-cg-api.hoyoverse.com/hk4e_global/cg/dispatcher/api/getNodesInfo` を書き換えます


「」
{
  "retcode": 0、
  "メッセージ": "OK",
  "データ"： {
    "wait_秒": 0、
    「ノード」: [
      {
        "ノード名": "A1",
        "net_state": "NetStateGood",
        "net_value": 22、
        "queue_state": "QueueStateLong",
        「キュー値」: 2280、
        「推奨」: true、
        "isp_type": 4、
        "地域ID": [
          「20107000055」
        ]、
        "node_id": "2010",
        "node_alias": "A1",
        「ベンダーID」: 2、
        "node_alias_i18n": "dispatch_nodeName_1"
      }、
      {
        "ノード名": "A2",
        "net_state": "NetStateGood",
        "net_value": 33、
        "queue_state": "QueueStateLong",
        「キュー値」: 1110、
        「推奨」: false、
        "isp_type": 4、
        "地域ID": [
          「20207000065」
        ]、
        "node_id": "2020",
        "node_alias": "A2",
        「ベンダーID」: 2、
        "node_alias_i18n": "dispatch_nodeName_2"
      }、
      {
        "ノード名": "S1",
        "net_state": "NetStateGood",
        "net_value": 400、
        "queue_state": "QueueStateLong",
        「キュー値」: 1110、
        「推奨」: true、
        "isp_type": 4、
        "地域ID": [
          「10907000036」
        ]、
        "ノードID": "1090",
        "node_alias": "S1",
        「ベンダーID」: 2、
        "node_alias_i18n": "dispatch_nodeName_0"
      }
    ]、
    "ネットワーク情報": null、
    "結果コード": "なし",
    "メンテナンス情報": null
  }
}
「」

A は米国、S はシンガポールを表します。