const SB_URL = 'https://supabase.co';
const SB_KEY = 'sb_publishable_Z2qu-WJIC8_TD_CDOR084w_tFGh08KH';

async function sb(path, opt = {}) {
  const res = await fetch(SB_URL + '/rest/v1/' + path, {
    headers: {
      'apikey': SB_KEY,
      'Authorization': 'Bearer ' + SB_KEY,
      'Content-Type': 'application/json',
      'Prefer': opt.prefer || 'return=representation'
    },
    ...opt
  });
  if (!res.ok) throw new Error(await res.text());
  const txt = await res.text();
  return txt ? JSON.parse(txt) : [];
}

document.getElementById('s-apply').innerHTML = `
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;align-items:start">
    <div class="wide" style="background:var(--sand);border-left:4px solid var(--amber)">
      <div class="kicker">Рекрутинг ZENIT</div>
      <h2 class="serif" style="font-size:1.5rem;margin-bottom:14px">Памятка кандидату</h2>
      <p class="lore-p" style="font-size:.96rem">Заявки рассматриваются советом офицеров в течение <b>24 часов</b>. После проверки персонажа по Черному списку мы свяжемся с вами в Discord или Telegram.</p>
      <div class="sub-h" style="margin-top:18px">Что важно указать:</div>
      <ul class="req-ul" style="margin-bottom:18px">
        <li><b>01.</b> Точный игровой никнейм без ошибок в регистре.</li>
        <li><b>02.</b> Ваш основной сервер (МСК / СПБ / ЕКБ) и текущий уровень.</li>
        <li><b>03.</b> Актуальный тег Discord или Telegram для собеседования.</li>
      </ul>
      <div style="padding:14px;background:var(--card);border:1px solid var(--brd);font-size:.9rem">
        <b>Совет:</b> Зарегистрируйтесь на портале под своим игровым ником — тогда вы сможете отслеживать статус анкеты прямо в Личном кабинете.
      </div>
    </div>
    <div class="wide">
      <h2 class="serif" style="font-size:1.45rem;margin-bottom:6px">Анкета на вступление</h2>
      <p style="font-size:.9rem;color:var(--acc);margin-bottom:18px">Поля со звёздочкой (*) обязательны для заполнения</p>
      <form id="form-apply">
        <label>Игровой ник в Stay Out *</label><input id="a-nick" required placeholder="Например: Сталкер_Волк">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div><label>Сервер *</label><input id="a-srv" required placeholder="МСК / СПБ"></div>
          <div><label>Реальный возраст *</label><input id="a-age" type="number" min="16" max="80" required placeholder="18"></div>
        </div>
        <label>Уровень персонажа и снаряжение *</label><input id="a-gear" required placeholder="Ур. 25+, ВСС / АК-107, броня...">
        <label>Примерный онлайн и прайм-тайм *</label><input id="a-time" required placeholder="2-4 часа в день, после 19:00 МСК">
        <label>Discord или Telegram для связи *</label><input id="a-cont" required placeholder="discord_tag или @username">
        <label>Опыт игры и почему выбрали ZENIT</label><textarea id="a-about" rows="3" placeholder="В каких кланах состояли ранее..."></textarea>
        <button type="submit" class="btn btn-p" id="btn-send-app" style="width:100%;margin-top:4px">Отправить анкету офицерам</button>
      </form>
    </div>
  </div>`;

document.getElementById('s-bl').innerHTML = `
  <div id="bl-lock" class="box" style="text-align:center;padding:42px 24px">
    <h2 class="serif" style="font-size:1.3rem;margin-bottom:10px">🔒 Доступ к Черному списку закрыт</h2>
    <p class="lore-p" style="margin-bottom:20px">База нарушителей доступна только зарегистрированным бойцам ZENIT.</p>
    <button type="button" class="btn btn-p" id="go-in">Войти</button>
    <button type="button" class="btn" id="go-reg">Регистрация</button>
  </div>
  <div id="bl-open" class="wide" style="display:none">
    <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px">
      <h2 class="serif" style="font-size:1.35rem">Черный список (КПК-База)</h2>
      <div style="display:flex;gap:8px"><input id="bl-q" placeholder="Поиск по нику..." style="margin:0;width:220px"><button type="button" class="btn btn-r" id="btn-show-blf">+ Внести</button></div>
    </div>
    <form id="bl-f" style="display:none;margin-top:14px">
      <input id="b-nick" required placeholder="Ник нарушителя"><input id="b-why" required placeholder="Причина"><input id="b-prf" placeholder="Пруф (скрин/видео)">
      <button type="submit" class="btn btn-r">Добавить в базу</button>
    </form>
    <div style="overflow-x:auto"><table><thead><tr><th>Ник</th><th>Причина</th><th>Пруф</th><th>Дата</th><th>Внес</th><th id="bl-del-h" style="display:none"></th></tr></thead><tbody id="bl-body"></tbody></table></div>
  </div>`;

document.getElementById('s-auth').innerHTML = `
  <div class="box">
    <div style="display:flex;gap:8px;margin-bottom:18px">
      <button type="button" class="btn btn-p" id="m-in" style="flex:1">Вход</button>
      <button type="button" class="btn" id="m-reg" style="flex:1">Регистрация</button>
    </div>
    <form id="form-auth">
      <label>Игровой ник *</label><input id="u-nick" required>
      <div id="reg-ex" style="display:none"><label>Discord / Telegram *</label><input id="u-cont"></div>
      <label>Пароль *</label><input id="u-pass" type="password" required>
      <button type="submit" class="btn btn-p" id="a-sub" style="width:100%">Войти в КПК</button>
    </form>
  </div>`;

document.getElementById('s-cab').innerHTML = `
  <div class="wide" style="margin-bottom:20px">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
      <div><h2 id="c-nick" class="serif" style="font-size:1.35rem">Боец</h2><div id="c-role" style="color:var(--amber);font-weight:700;font-size:.9rem"></div><div id="c-cont" style="font-size:.9rem"></div></div>
      <div><button type="button" class="btn btn-r" id="btn-out">Выйти</button></div>
    </div>
    <hr style="border:0;border-top:1px solid var(--brd);margin:16px 0"><div id="c-app">Загрузка...</div>
  </div>
  <div class="wide" id="off-box" style="display:none;border-color:var(--amber);margin-bottom:20px">
    <h3 class="serif" style="font-size:1.15rem;margin-bottom:10px">🛡️ Панель офицера: Заявки кандидатов</h3>
    <div style="overflow-x:auto"><table><thead><tr><th>Ник</th><th>Возраст</th><th>Снаряжение</th><th>Связь</th><th>Статус</th><th>Решение</th></tr></thead><tbody id="off-body"></tbody></table></div>
  </div>
  <div class="wide" id="usr-box" style="display:none;border-color:var(--acc)">
    <h3 class="serif" style="font-size:1.15rem;margin-bottom:10px">🎖️ Состав портала (управление званиями)</h3>
    <div style="overflow-x:auto"><table><thead><tr><th>Ник</th><th>Связь</th><th>Роль</th><th>Действие</th></tr></thead><tbody id="usr-body"></tbody></table></div>
  </div>`;

let cur = null, mode = 'in', blCache = [];
try { cur = JSON.parse(localStorage.getItem('z_cur')); } catch (e) {}
function saveCur(u) { cur = u; try { localStorage.setItem('z_cur', JSON.stringify(u)); } catch (e) {} }

function tab(id) {
  if (id === 'cab' && !cur) id = 'auth';
  document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.ntab').forEach(t => t.classList.remove('active'));
  document.getElementById('s-' + id).classList.add('active');
  const b = document.querySelector('.ntab[data-t="' + id + '"]');
  if (b) b.classList.add('active');
  if (id === 'bl') loadBL();
  if (id === 'cab') loadCab();
}

function upd() {
  const t = document.getElementById('top-auth'), c = document.getElementById('t-cab');
  if (cur) {
    c.textContent = 'Кабинет (' + cur.nick + ')';
    t.innerHTML = '<button type="button" class="lbtn hi" id="t-c">👤 ' + cur.nick + '</button> / <button type="button" class="lbtn" id="t-o">Выйти</button>';
    document.getElementById('t-c').onclick = () => tab('cab');
    document.getElementById('t-o').onclick = () => { saveCur(null); upd(); tab('home'); };
  } else {
    c.textContent = 'Личный кабинет';
    t.innerHTML = '<button type="button" class="lbtn" id="t-i">Войти</button> / <button type="button" class="lbtn hi" id="t-r">Регистрация</button>';
    document.getElementById('t-i').onclick = () => { setM('in'); tab('auth'); };
    document.getElementById('t-r').onclick = () => { setM('reg'); tab('auth'); };
  }
}

function setM(m) {
  mode = m;
  document.getElementById('m-in').className = m === 'in' ? 'btn btn-p' : 'btn';
  document.getElementById('m-reg').className = m === 'reg' ? 'btn btn-p' : 'btn';
  document.getElementById('reg-ex').style.display = m === 'reg' ? 'block' : 'none';
  document.getElementById('a-sub').textContent = m === 'in' ? 'Войти в КПК' : 'Создать аккаунт';
}

async function loadBL() {
  document.getElementById('bl-lock').style.display = cur ? 'none' : 'block';
  document.getElementById('bl-open').style.display = cur ? 'block' : 'none';
  if (!cur) return;
  document.getElementById('bl-del-h').style.display = cur.role === 'Офицер' ? 'table-cell' : 'none';
  document.getElementById('bl-body').innerHTML = '<tr><td colspan="6">Загрузка базы ЧС...</td></tr>';
  try {
    blCache = await sb('clan_blacklist?select=*&order=id.desc');
    drawBL();
  } catch (e) { document.getElementById('bl-body').innerHTML = '<tr><td colspan="6">Ошибка загрузки ЧС</td></tr>'; }
}

function drawBL() {
  const q = document.getElementById('bl-q').value.toLowerCase();
  const isOff = cur && cur.role === 'Офицер';
  document.getElementById('bl-body').innerHTML = blCache
    .filter(x => x.nick.toLowerCase().includes(q) || x.reason.toLowerCase().includes(q))
    .map(x => `<tr><td style="color:var(--red);font-weight:700">${x.nick}</td><td>${x.reason}</td><td>${x.proof || '—'}</td><td>${new Date(x.created_at).toLocaleDateString('ru-RU')}</td><td>${x.author}</td>${isOff ? `<td><button type="button" class="btn btn-r" style="padding:4px 10px" onclick="delBL(${x.id})">Убрать</button></td>` : ''}</tr>`).join('') || '<tr><td colspan="6">Записей пока нет</td></tr>';
}

