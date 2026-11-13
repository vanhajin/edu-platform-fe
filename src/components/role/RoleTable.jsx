import Icon from '../dashboard/Icon.jsx'

export default function RoleTable({ rows, headers }) {
  return <div className="card table-card"><div className="table-scroll"><table><thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{index < 2 ? <strong>{cell}</strong> : cell}</td>)}<td><div className="actions"><button className="act view" aria-label="Xem chi tiết"><Icon name="eye" size={16} /></button><button className="act edit" aria-label="Chỉnh sửa"><Icon name="edit" size={16} /></button><button className="act delete" aria-label="Xóa"><Icon name="trash" size={16} /></button></div></td></tr>)}</tbody></table></div><div className="pagination"><span>Hiển thị {rows.length} bản ghi</span><div className="pages"><button className="current">1</button><button>2</button><button>→</button></div></div></div>
}
