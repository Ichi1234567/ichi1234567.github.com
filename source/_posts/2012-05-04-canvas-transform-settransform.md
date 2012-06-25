---
layout: post
title: "[canvas] transform、setTransform"
tagline: ""
description: ""
category: canvas
tags: [js, canvas]
---


canvas有2個長得很像的method，分別是transform和setTransform，他們的parameter都一樣，可是、他們的功能又有些微的差異，對此做了小小的紀錄。

同：

  皆是對"canvas"做transform的動作。
  參數相同。

異：

  transform會持續的累積所有對canvas的操作、包含了scale，rotate， translate，當然…還有transform。
  但是、setTransform並不會累積操作。也就是說…使用了setTransform的意思是說，先將canvas做reset，回到最初的狀態，接著再做transform。
<!-- more -->
tips：
利用setTransform會將canvas做reset的特性、我覺得在下面的情況下可以有很好的使用。

    拿來做lookAt。
    lookAt是要將視線焦點移到某座標的方法，也就是說，當我們要lookAt某位置的時候、整體的操作將會重頭開始。當然、transform也是可以達到相同的效果。只是、我的習慣是傾向於lookAt後、整體會重新開始、而不受之前的影響。
    clearRect的前置動作。
    一般來說，清除畫布，都會使用clearRect(x, y, w, h)，x, y 為清除的起始位置，w, h分別是width和height，可是，當整個繪圖的過程充斥著對canvas的操作時，會因為很難確定x, y而可能導致進行清除的動作有困難或清除位置有錯。因此、在使用clearRect前，可以先setTransform。

    >   ctx.setTransform(1, 0, 0, 1, 0, 0);
    >   ctx.clearRect(0, 0, w, h);
