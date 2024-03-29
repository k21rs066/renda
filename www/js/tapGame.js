//
//  tapGame.js
//  MonacaFirstApp
//
//  Created by Natsumo Ikeda on 2016/07/01.
//  Copyright 2017 FUJITSU CLOUD TECHNOLOGIES LIMITED All Rights Reserved.
//


// mBaaSの初期化
var ncmb = new NCMB(this.APPLICATION_KEY, this.CLIENT_KEY);
// タイマー設定
var countTimer = 8;
var countTimer2 = 13;
var countTimer3 = 33;
// タップ回数カウンター
var counter = 0;
// 「tapFlag」的のタップ可否設定
var tapFlag = false;

// 「5秒連打」ボタン押下時の処理
function startGame() {
    // ボタンの無効化
    document.gameForm.start.disabled = true;
    document.gameForm.ranking.disabled = true;
    
    // タップカウンターリセット
    this.counter = 0;
    $("#list-page strong").html(String(0));
    // タイマーリセット
    this.countTimer = 8;
    // タイマーを起動
    countTime(countTimer);
}

// 「10秒連打」ボタン押下時の処理
function startGame2() {
    // ボタンの無効化
    document.gameForm.start.disabled = true;
    document.gameForm.ranking.disabled = true;
    
    // タップカウンターリセット
    this.counter = 0;
    $("#list-page strong").html(String(0));
    // タイマーリセット
    this.countTimer = 13;
    // タイマーを起動
    countTime2(countTimer2);
}

// 「30秒連打」ボタン押下時の処理
function startGame3() {
    // ボタンの無効化
    document.gameForm.start.disabled = true;
    document.gameForm.ranking.disabled = true;
    
    // タップカウンターリセット
    this.counter = 0;
    $("#list-page strong").html(String(0));
    // タイマーリセット
    this.countTimer3 = 33;
    // タイマーを起動
    countTime3(countTimer3);
}

// 【mBaaS】データの保存
function saveScore (name, score) {
    // **********【問題１】名前とスコアを保存しよう！**********
    var GameScore = ncmb.DataStore("GameScore");
    var gameScore = new GameScore();
    gameScore.set("name",name);
    gameScore.set("score",score);
    gameScore.save().then(function(){
        console.log("保存に成功しました。");
    }).catch(function(error){
        console.log("保存に失敗しました。エラー:" + error);
    });
    // ********************************************************
}

// タイマー
function countTime(time) {
    if (time > 0){
        if (time >= 6) {
            this.tapFlag = false;
            $("#list-page p").html(String(time-5));
        } else if (time == 5) {
            this.tapFlag = true;
            $("#list-page p").html("スタート！");
        } else {
            this.tapFlag = true;
            $("#list-page p").html(String(time));
        }
        this.countTimer -= 1;
        // １秒後にcountTime()を呼び出す
        setTimeout("countTime(countTimer)",1000);
    } else {
        this.tapFlag = false;
        $("#list-page p").html("タイムアップ！");
        imputName(this.counter);
    }    
}

function countTime2(time) {
    if (time > 0){
        if (time >= 11) {
            this.tapFlag = false;
            $("#list-page p").html(String(time-10));
        } else if (time == 10) {
            this.tapFlag = true;
            $("#list-page p").html("スタート！");
        } else {
            this.tapFlag = true;
            $("#list-page p").html(String(time));
        }
        this.countTimer2 -= 1;
        // １秒後にcountTime()を呼び出す
        setTimeout("countTime2(countTimer2)",1000);
    } else {
        this.tapFlag = false;
        $("#list-page p").html("タイムアップ！");
        imputName(this.counter);
    }    
}

function countTime3(time) {
    if (time > 0){
        if (time >= 31) {
            this.tapFlag = false;
            $("#list-page p").html(String(time-30));
        } else if (time == 30) {
            this.tapFlag = true;
            $("#list-page p").html("スタート！");
        } else {
            this.tapFlag = true;
            $("#list-page p").html(String(time));
        }
        this.countTimer3 -= 1;
        // １秒後にcountTime()を呼び出す
        setTimeout("countTime3(countTimer3)",1000);
    } else {
        this.tapFlag = false;
        $("#list-page p").html("タイムアップ！");
        imputName(this.counter);
    }    
}

// 名前入力アラートの表示
function imputName(count){
    // 入力アラートを表示
	var name = window.prompt("名前を入力してください", "");
    if (name == null || name == "") {
        $("#list-page p").html("保存がキャンセルされました");        
    } else {
        // スコアと入力した名前を保存
        saveScore(name, count);
        $("#list-page p").html(name + "さんのスコアは" + String(count) + "連打でした"); 
    }
    // ボタンの有効化
    document.gameForm.start.disabled = false;
    document.gameForm.ranking.disabled = false;
}

// タップ数カウント
function tapCount() {
    if (tapFlag) {
        this.counter += 1;
        $("#list-page strong").html(String(this.counter));
    }
}
