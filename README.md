#Magic Accordion

more information and demo http://luke.sno.wden.co.uk/magic-accordion

Really cant get much more simpler than this...

```javascript
// these are defaults, no need to pass the options
$('.someSelectorOfContentWrapper').magicAccordion({
	headingTag 	: 'h2',
	bodyClass 	: 'body',
	headClass 	: 'head',
	activeClass : 'active',
	speed 		: 200
});
```

```html
<div class="someSelectorOfContentWrapper">

	<h2>Some amazing header</h2>

	<p>Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae. Cum sociis natoque penatibus et magnis dis parturient. Unam incolunt Belgae, aliam Aquitani, tertiam. Hi omnes lingua, institutis, legibus inter se differunt.</p>
	<p>Curabitur blandit tempus ardua ridiculus sed magna. Quam diu etiam furor iste tuus nos eludet? Curabitur est gravida et libero vitae dictum. Qui ipsorum lingua Celtae, nostra Galli appellantur. Hi omnes lingua, institutis, legibus inter se differunt. Curabitur blandit tempus ardua ridiculus sed magna.</p>
	<p>Hi omnes lingua, institutis, legibus inter se differunt. Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Curabitur blandit tempus ardua ridiculus sed magna. Salutantibus vitae elit libero, a pharetra augue.</p>

	<h2>And yet another...</h2>

	<p>Curabitur blandit tempus ardua ridiculus sed magna. Inmensae subtilitatis, obscuris et malesuada fames. Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Unam incolunt Belgae, aliam Aquitani, tertiam. Pellentesque habitant morbi tristique senectus et netus. Qui ipsorum lingua Celtae, nostra Galli appellantur.</p>

	<h2>Some amazing header</h2>

	<p>Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae. Cum sociis natoque penatibus et magnis dis parturient. Unam incolunt Belgae, aliam Aquitani, tertiam. Hi omnes lingua, institutis, legibus inter se differunt.</p>
	<ul>
		<li>list item 1</li>
		<li>list item 2</li>
		<li>list item 3</li>
	</ul>
	<p>Curabitur blandit tempus ardua ridiculus sed magna. Quam diu etiam furor iste tuus nos eludet? Curabitur est gravida et libero vitae dictum. Qui ipsorum lingua Celtae, nostra Galli appellantur. Hi omnes lingua, institutis, legibus inter se differunt. Curabitur blandit tempus ardua ridiculus sed magna.</p>
	<p>Hi omnes lingua, institutis, legibus inter se differunt. Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Curabitur blandit tempus ardua ridiculus sed magna. Salutantibus vitae elit libero, a pharetra augue.</p>

	<h2>And yet another...</h2>

	<p>Curabitur blandit tempus ardua ridiculus sed magna. Inmensae subtilitatis, obscuris et malesuada fames. Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Unam incolunt Belgae, aliam Aquitani, tertiam. Pellentesque habitant morbi tristique senectus et netus. Qui ipsorum lingua Celtae, nostra Galli appellantur.</p>

</div>
```

If you want to listed to some events... here you go

```javascript
$('.magic-accordion').on( 'opened.magic', function(e){
	e.body.html('mwhahahahah');
});
$('.magic-accordion').on( 'closed.magic', function(e){
	e.head.html('you closed me!!');
});
```