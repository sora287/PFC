// 初期設定
const initial_base = 30000;
const initial_rate = 5;
const initial_duration = $('#duration').val();

// 入力値に桁数制限を設ける
function sliceMaxLength(elem, maxLength) {
	elem.value = elem.value.slice(0, maxLength);
}

// 試算結果の数値をカンマ区切りにする
function comma(num) {
	const price = String(num).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	return price;
}

// 初期値をformタグの値としてセット
$('#base').val(initial_base);
$('#rate').val(initial_rate);

// シミュレーション結果を自動計算および出力
let base = initial_base;
let rate = initial_rate;
let duration = initial_duration;

let invest = 0;
let sum = 0

function resultCalc() {
	invest = 0;
	sum = 0
	$('#result').append('<tr><th>年数</th><th>元本</th><th>合計資産</th><th>運用益</th></tr>');
	for (let i = 1; i <= duration; i++) {
		invest = base * 12 * i;
		sum += Math.round(base * 12 * ((1 + rate / 100) ** i));
		benefit = sum - invest;
		$('#result').append('<tr><td>' + i + '年後</td><td>&yen;' + comma(invest) + '</td><td>&yen;' + comma(sum) + '</td><td>+ &yen;' + comma(benefit) + '</td></tr>');
	}
}
resultCalc();

// HTML内の各種ボタンが押された時の処理
$(function() {
	$('#baseSub').on('click', function() {
		$('#result').empty();
		if(base < 10000) {
			base = 0;
		} else {
			base -= 10000;
		}
		$('#base').val(base);
		resultCalc();
	});
	$('#baseAdd').on('click', function() {
		$('#result').empty();
		if(base < 990000) {
			base += 10000;
		} else {
			base = 999999;
		}
		$('#base').val(base);
		resultCalc();
	});

	$('#rateSub').on('click', function() {
		$('#result').empty();
		if(rate <= 0) {
			rate = 0;
		} else {
			rate --;
			$('#rate').val(rate);
		}
		resultCalc();
	});
	$('#rateAdd').on('click', function() {
		$('#result').empty();
		if(rate < 99) {
			rate ++;
			$('#rate').val(rate);
		}
		resultCalc();
	});

	$('#duration').change(function() {
		$('#result').empty();
		duration = $('#duration').val();
		resultCalc();
	});
});

$(function() {
	$('#base').change(function() {
		$('#result').empty();
		base = Number($('#base').val());
		resultCalc();
	});
	$('#rate').change(function() {
		$('#result').empty();
		rate = Number($('#rate').val());
		resultCalc();
	});
});
